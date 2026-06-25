// ─────────────────────────────────────────────────────────
// GOOGLE APPS SCRIPT FOR COMPETITIVE EXAM PORTAL
// Paste this code in Extensions -> Apps Script on your Google Sheet.
// Deploy as Web App, accessible to "Anyone".
// ─────────────────────────────────────────────────────────

var SHEET_ID = "1S_22NLH6lht2E2D6yu5qnLA-f51kKe6HttjG79T80hQ";

function doGet(e) {
  var action = e.parameter.action;
  var ss = SpreadsheetApp.openById(SHEET_ID);
  
  // ── GET RESULTS ──
  if (action === "getResults") {
    var sheet = ss.getSheetByName("Results");
    if (!sheet) {
      return createJsonResponse([]);
    }
    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return createJsonResponse([]);
    }
    
    var headers = data[0];
    var results = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var obj = {};
      headers.forEach(function(h, idx) {
        var key = h.toLowerCase().replace(/\s+/g, '');
        obj[key] = row[idx];
      });
      results.push(obj);
    }
    return createJsonResponse(results);
  }
  
  // ── GET QUESTIONS (Default or action === "getQuestions") ──
  var engSheet = ss.getSheetByName("Question") || ss.getSheetByName("Questions");
  var hindiSheet = ss.getSheetByName("Question Hindi");
  
  if (!engSheet || !hindiSheet) {
    return createJsonResponse({ error: "Questions sheet not found" });
  }
  
  var engData = engSheet.getDataRange().getValues();
  var hindiData = hindiSheet.getDataRange().getValues();
  
  var engQuestions = parseQuestions(engData);
  var hindiQuestions = parseQuestions(hindiData);
  
  var response = {
    english: engQuestions,
    hindi: hindiQuestions
  };
  
  return createJsonResponse(response);
}

function parseQuestions(data) {
  if (data.length <= 1) return [];
  var headers = data[0];
  var questions = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var obj = {};
    headers.forEach(function(h, idx) {
      obj[h] = row[idx];
    });
    questions.push(obj);
  }
  return questions;
}

function doPost(e) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName("Results");
  if (!sheet) {
    sheet = ss.insertSheet("Results");
  }
  
  var params = JSON.parse(e.postData.contents);
  var action = params.action;
  
  if (action === "saveResult") {
    // Verify or append headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Name", "Mobile", "Subject", "Score", "Result", "Date"]);
    }
    
    var headers = sheet.getDataRange().getValues()[0];
    var dateStr = params.date || new Date().toLocaleString();
    
    var rowValues = headers.map(function(h) {
      var key = h.toLowerCase().replace(/\s+/g, '');
      if (key === 'name') return params.name;
      if (key === 'mobile') return params.mobile;
      if (key === 'subject' || key === 'post') return params.subject;
      if (key === 'score') return params.score;
      if (key === 'result') return params.result;
      if (key === 'date') return dateStr;
      return "";
    });
    
    sheet.appendRow(rowValues);
    
    return createJsonResponse({ status: "success", message: "Result saved successfully" });
  }
  
  return createJsonResponse({ status: "error", message: "Invalid action" });
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
}

function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
}
