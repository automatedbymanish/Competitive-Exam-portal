import { useEffect, useState, useCallback } from "react";
import loginBg from "./assets/login-bg.png";
import oswalLogo from "./assets/oswal-logo.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Poppins', sans-serif;
    background: #faf8f5;
    min-height: 100vh;
    position: relative;
  }
  body::before {
    content: '';
    position: fixed;
    top: -10%;
    right: -10%;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(253, 224, 71, 0.08) 0%, rgba(255, 255, 255, 0) 70%);
    filter: blur(80px);
    z-index: -1;
    pointer-events: none;
  }
  body::after {
    content: '';
    position: fixed;
    bottom: -10%;
    left: -10%;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(251, 191, 36, 0.06) 0%, rgba(255, 255, 255, 0) 70%);
    filter: blur(100px);
    z-index: -1;
    pointer-events: none;
  }

  .portal-wrapper {
    min-height: 100vh;
    background: linear-gradient(135deg, #ffffff 0%, #faf6e8 50%, #f7f0d3 100%);
    padding: 30px 20px 60px;
    position: relative;
    z-index: 1;
  }

  .portal-header {
    text-align: center;
    margin-bottom: 36px;
  }
  .portal-header .badge {
    display: inline-block;
    background: linear-gradient(90deg, #4f8ef7, #a259f7);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 5px 18px;
    border-radius: 50px;
    margin-bottom: 14px;
  }
  .portal-header h1 {
    font-family: 'Nunito', sans-serif;
    font-size: clamp(26px, 5vw, 42px);
    font-weight: 900;
    color: #1a1d3b;
    line-height: 1.15;
  }
  .portal-header h1 span {
    background: linear-gradient(90deg, #4f8ef7, #a259f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .portal-header p {
    margin-top: 8px;
    color: #6b7280;
    font-size: 15px;
  }

  .card {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(79,142,247,0.10), 0 1.5px 6px rgba(0,0,0,0.04);
    padding: 36px 32px;
  }

  .form-card {
    max-width: 480px;
    margin: 0 auto;
    background: linear-gradient(135deg, #ffffff 0%, #f0f6ff 50%, #dbeafe 100%);
    border: 1px solid rgba(59, 130, 246, 0.2);
    box-shadow: 0 16px 40px rgba(59, 130, 246, 0.08), 0 2px 8px rgba(0, 0, 0, 0.02);
  }
  .form-card h2 {
    font-family: 'Nunito', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #1a1d3b;
    margin-bottom: 6px;
    text-align: center;
  }
  .form-card .subtitle {
    text-align: center;
    color: #4b5563;
    font-size: 13px;
    margin-bottom: 28px;
  }
  .form-card .field-group label {
    color: #374151;
  }
  .form-card .field-group input,
  .form-card .field-group select {
    background: #ffffff;
    border: 1.5px solid #dbeafe;
    color: #111827;
  }
  .form-card .field-group input:focus,
  .form-card .field-group select:focus {
    border-color: #3b82f6;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }

  .field-group {
    margin-bottom: 16px;
  }
  .field-group label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 6px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .field-group input,
  .field-group select {
    width: 100%;
    padding: 13px 16px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
    color: #111827;
    background: #f9fafb;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  .field-group input:focus,
  .field-group select:focus {
    border-color: #4f8ef7;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(79,142,247,0.12);
  }
  .field-group select {
    cursor: pointer;
  }

  .btn-start {
    width: 100%;
    padding: 15px;
    margin-top: 10px;
    background: linear-gradient(135deg, #4f8ef7, #a259f7);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    letter-spacing: 0.5px;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(79,142,247,0.30);
    transition: transform 0.15s, box-shadow 0.15s;
    display: block;
    text-align: center;
    text-decoration: none;
  }
  .btn-start:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(79,142,247,0.40);
  }
  .btn-start:active { transform: translateY(0); }

  .exam-wrapper { max-width: 860px; margin: 0 auto; }

  .submit-overlay {
    position: fixed;
    inset: 0;
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(6px);
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .submit-spinner {
    width: 64px;
    height: 64px;
    border: 5px solid #e5e7eb;
    border-top-color: #16a34a;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .submit-overlay h3 {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #1a1d3b;
  }
  .submit-overlay p {
    font-size: 13px;
    color: #6b7280;
    margin-top: -12px;
  }
  .submit-dots span {
    display: inline-block;
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #16a34a;
    margin: 0 3px;
    animation: dotBounce 1.2s infinite ease-in-out;
  }
  .submit-dots span:nth-child(2) { animation-delay: 0.2s; }
  .submit-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes dotBounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40% { transform: scale(1.1); opacity: 1; }
  }

  .result-card {
    text-align: center;
    padding: 44px 32px;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 8px 32px rgba(79,142,247,0.12);
    margin-top: 36px;
  }
  .result-icon {
    font-size: 56px;
    margin-bottom: 16px;
  }

  .steps {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 28px;
    flex-wrap: wrap;
  }
  .step {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #9ca3af;
    font-weight: 600;
  }
  .step.active { color: #4f8ef7; }
  .step-dot {
    width: 22px; height: 22px;
    border-radius: 50%;
    background: #e5e7eb;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 800;
    color: #9ca3af;
  }
  .step.active .step-dot {
    background: linear-gradient(135deg, #4f8ef7, #a259f7);
    color: #fff;
  }
  .step-line {
    width: 24px; height: 2px;
    background: #e5e7eb;
  }

  /* ── ADMIN LOGIN ── */
  .admin-login-wrap {
    max-width: 420px;
    margin: 0 auto;
  }
  .admin-login-wrap .card {
    background: linear-gradient(135deg, #ffffff 0%, #f0f6ff 50%, #dbeafe 100%);
    border: 1px solid rgba(59, 130, 246, 0.2);
    box-shadow: 0 16px 40px rgba(59, 130, 246, 0.08), 0 2px 8px rgba(0, 0, 0, 0.02);
  }
  .admin-login-wrap h2 {
    font-family: 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: 900;
    color: #1a1d3b;
    text-align: center;
    margin-bottom: 4px;
  }
  .admin-login-wrap .subtitle {
    text-align: center;
    color: #4b5563;
    font-size: 13px;
    margin-bottom: 28px;
  }
  .admin-login-wrap .field-group label {
    color: #374151;
  }
  .admin-login-wrap .field-group input {
    background: #ffffff;
    border: 1.5px solid #dbeafe;
    color: #111827;
  }
  .admin-login-wrap .field-group input:focus {
    border-color: #3b82f6;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
  .btn-admin-login {
    width: 100%;
    padding: 14px;
    margin-top: 8px;
    background: linear-gradient(135deg, #1a1d3b, #4f3fa0);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(79,62,160,0.30);
    transition: transform 0.15s, box-shadow 0.15s;
    letter-spacing: 0.5px;
  }
  .btn-admin-login:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(79,62,160,0.40);
  }
  .btn-back-link {
    display: block;
    text-align: center;
    margin-top: 16px;
    color: #6b7280;
    font-size: 13px;
    cursor: pointer;
    background: none;
    border: none;
    font-family: 'Poppins', sans-serif;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .btn-back-link:hover { color: #4f8ef7; }

  /* ── DASHBOARD ── */
  .dashboard-wrapper {
    max-width: 1500px;
    width: 96%;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 24px;
    padding: 40px 32px;
    box-shadow: 0 20px 50px rgba(139, 92, 26, 0.05), 0 2px 10px rgba(0, 0, 0, 0.02);
  }
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px;
    margin-bottom: 28px;
  }
  .dashboard-header-left h2 {
    font-family: 'Nunito', sans-serif;
    font-size: 28px;
    font-weight: 900;
    color: #1a1d3b;
  }
  .dashboard-header-left p {
    color: #6b7280;
    font-size: 13px;
    margin-top: 3px;
  }
  .dashboard-header-right {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .btn-refresh {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 20px;
    background: linear-gradient(135deg, #4f8ef7, #a259f7);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(79,142,247,0.25);
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .btn-refresh:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(79,142,247,0.35);
  }
  .btn-refresh.spinning svg {
    animation: spin 0.7s linear infinite;
  }
  .btn-logout {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 20px;
    background: linear-gradient(135deg, #fee2e2, #fecaca);
    color: #b91c1c;
    border: 1.5px solid #fca5a5;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .btn-logout:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(185,28,28,0.15);
  }

  .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }
  .stat-card {
    border-radius: 20px;
    padding: 26px 24px;
    display: flex;
    align-items: center;
    gap: 20px;
    transition: transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.22s;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }
  .stat-card:hover {
    transform: translateY(-5px);
  }
  .stat-card.candidates-card {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    box-shadow: 0 12px 24px rgba(37, 99, 235, 0.25), inset 0 2px 4px rgba(255,255,255,0.2);
  }
  .stat-card.pass-card {
    background: linear-gradient(135deg, #059669, #047857);
    box-shadow: 0 12px 24px rgba(5, 150, 105, 0.25), inset 0 2px 4px rgba(255,255,255,0.2);
  }
  .stat-card.fail-card {
    background: linear-gradient(135deg, #ea580c, #dc2626);
    box-shadow: 0 12px 24px rgba(220, 38, 38, 0.25), inset 0 2px 4px rgba(255,255,255,0.2);
  }
  .stat-card.rate-card {
    background: linear-gradient(135deg, #7c3aed, #6d28d9);
    box-shadow: 0 12px 24px rgba(124, 58, 237, 0.25), inset 0 2px 4px rgba(255,255,255,0.2);
  }
  .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    flex-shrink: 0;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  .stat-info .stat-num {
    font-family: 'Nunito', sans-serif;
    font-size: 36px;
    font-weight: 900;
    line-height: 1.1;
    color: #ffffff;
  }
  .stat-info .stat-label {
    font-size: 12px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    margin-top: 2px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .controls-bar {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 16px;
    padding: 18px 20px;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.04);
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }
  .search-input-wrap {
    position: relative;
    flex: 1;
    min-width: 200px;
  }
  .search-input-wrap .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 16px;
    pointer-events: none;
  }
  .search-input-wrap input {
    width: 100%;
    padding: 11px 12px 11px 36px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-size: 13px;
    font-family: 'Poppins', sans-serif;
    color: #111827;
    background: #f9fafb;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .search-input-wrap input:focus {
    border-color: #4f8ef7;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(79,142,247,0.12);
  }
  .filter-group {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .filter-btn {
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    border: 1.5px solid #e5e7eb;
    background: #f9fafb;
    color: #6b7280;
    transition: all 0.15s;
  }
  .filter-btn:hover { border-color: #4f8ef7; color: #4f8ef7; }
  .filter-btn.active-all {
    background: linear-gradient(135deg, #4f8ef7, #a259f7);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 2px 10px rgba(79,142,247,0.30);
  }
  .filter-btn.active-pass {
    background: linear-gradient(135deg, #16a34a, #15803d);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 2px 10px rgba(22,163,74,0.25);
  }
  .filter-btn.active-fail {
    background: linear-gradient(135deg, #dc2626, #b91c1c);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 2px 10px rgba(220,38,38,0.25);
  }

  .table-wrap {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
    overflow: hidden;
  }
  .table-scroll {
    overflow-x: auto;
    max-height: 600px;
    overflow-y: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
  }
  thead th {
    padding: 18px 24px;
    text-align: left;
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.95);
    letter-spacing: 0.8px;
    text-transform: uppercase;
    white-space: nowrap;
    position: sticky;
    top: 0;
    z-index: 10;
    background: linear-gradient(135deg, #1a1d3b, #2d3069);
  }
  tbody tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
    transition: background 0.2s ease;
  }
  tbody tr:nth-child(even) {
    background: rgba(250, 248, 245, 0.4);
  }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover {
    background: rgba(79, 142, 247, 0.04);
  }
  tbody td {
    padding: 16px 24px;
    font-size: 13px;
    color: #374151;
    vertical-align: middle;
  }
  .td-name {
    font-weight: 700;
    color: #1a1d3b;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
  }
  .td-email {
    color: #3b82f6;
    font-weight: 600;
    font-size: 13px;
  }
  .td-mobile {
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    color: #4b5563;
  }
  .result-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: 11px;
    padding: 6px 14px;
    border-radius: 50px;
    letter-spacing: 0.5px;
  }
  .result-badge.pass {
    background: #e6fcf5;
    color: #0ca678;
    border: 1px solid #96f2d7;
    box-shadow: 0 0 12px rgba(12, 166, 120, 0.15);
  }
  .result-badge.fail {
    background: #fff5f5;
    color: #f03e3e;
    border: 1px solid #ffc9c9;
    box-shadow: 0 0 12px rgba(240, 62, 62, 0.15);
  }
  .table-footer {
    padding: 14px 18px;
    background: rgba(249, 250, 251, 0.8);
    border-top: 1px solid rgba(0,0,0,0.05);
    font-size: 12px;
    color: #6b7280;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .no-data {
    text-align: center;
    padding: 60px 20px;
    color: #9ca3af;
  }
  .no-data .no-data-icon {
    font-size: 44px;
    margin-bottom: 12px;
  }
  .no-data p {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #6b7280;
  }
  .no-data span {
    font-size: 13px;
    color: #9ca3af;
    margin-top: 4px;
    display: block;
  }
  .loading-row td {
    text-align: center;
    padding: 50px;
    color: #9ca3af;
  }
  .dash-spinner {
    width: 36px;
    height: 36px;
    border: 4px solid #e5e7eb;
    border-top-color: #4f8ef7;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 12px;
  }

  .td-actions {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 50px;
    font-size: 11px;
    font-weight: 800;
    font-family: 'Nunito', sans-serif;
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
    border: none;
    line-height: 1;
  }
  .action-btn:hover {
    transform: translateY(-2px);
  }
  .action-btn:active {
    transform: translateY(0);
  }
  .action-btn svg {
    flex-shrink: 0;
  }
  .wa-btn {
    background: linear-gradient(135deg, #10b981, #059669);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(5, 150, 105, 0.2);
  }
  .wa-btn:hover {
    background: linear-gradient(135deg, #059669, #047857);
    box-shadow: 0 6px 16px rgba(5, 150, 105, 0.35);
  }

  .btn-dashboard {
    width: 100%;
    padding: 13px;
    margin-top: 10px;
    background: linear-gradient(135deg, #1a1d3b, #4f3fa0);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    letter-spacing: 0.5px;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(79,62,160,0.25);
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .btn-dashboard:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(79,62,160,0.35);
  }
  .btn-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 18px;
    margin-bottom: 2px;
  }
  .btn-divider-line {
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }
  .btn-divider span {
    font-size: 11px;
    color: #9ca3af;
    font-weight: 600;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .dashboard-header { flex-direction: column; align-items: flex-start; }
    .stat-grid { grid-template-columns: 1fr 1fr; }
    .controls-bar { flex-direction: column; }
    .search-input-wrap { min-width: 100%; }
  }
  @media (max-width: 480px) {
    .stat-grid { grid-template-columns: 1fr; }
  }

  /* ── SPLIT SCREEN LAYOUT ── */
  .login-split-container {
    display: flex;
    min-height: 100vh;
    width: 100%;
    background: linear-gradient(135deg, #ffffff 0%, #faf6e8 50%, #f7f0d3 100%);
  }

  /* Left Section (60%) */
  .login-left-section {
    position: relative;
    width: 60%;
    background-image: url(${loginBg});
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: #ffffff;
    overflow: hidden;
  }
  .login-left-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 1;
  }
  .left-content-panel {
    position: relative;
    z-index: 2;
    max-width: 580px;
    width: 100%;
  }
  .left-content-panel .glass-panel {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
  .branding-container {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    padding: 6px 16px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(8px);
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
  .branding-logo {
    height: 40px;
    width: auto;
    object-fit: contain;
    border-radius: 10px;
  }
  .branding-text {
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1px;
    color: #ffd54f;
    text-transform: uppercase;
  }
  .left-content-panel h2 {
    font-family: 'Nunito', sans-serif;
    font-size: clamp(28px, 3.5vw, 42px);
    font-weight: 900;
    line-height: 1.2;
    margin-bottom: 16px;
    animation: fadeInUp 0.8s ease-out;
  }
  .left-content-panel h2 span.highlight-gold {
    color: #ffd54f;
    background: linear-gradient(90deg, #ffd54f, #f4b400);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .left-sub {
    font-size: 16px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 28px;
    animation: fadeInUp 1s ease-out;
  }
  .left-quote {
    position: relative;
    border-left: 3px solid #ffd54f;
    padding-left: 20px;
    animation: fadeInUp 1.2s ease-out;
  }
  .left-quote p {
    font-style: italic;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.5;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Right Section (40%) */
  .login-right-section {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    overflow-y: auto;
  }
  
  /* White glass card styling */
  .login-glass-card {
    width: 100%;
    max-width: 440px;
    background: rgba(255, 255, 255, 0.85) !important;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(244, 180, 0, 0.3) !important; /* Thin gold border */
    border-radius: 24px !important;
    box-shadow: 0 20px 50px rgba(244, 180, 0, 0.06), 0 4px 20px rgba(0, 0, 0, 0.03) !important;
    padding: 40px 32px !important;
    transition: transform 0.3s ease;
  }
  
  /* Company Logo */
  .logo-container {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .company-logo {
    height: 50px;
    width: auto;
    object-fit: contain;
    border-radius: 14px;
  }
  .company-logo-text {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #2563EB;
  }

  /* Branding Badge (Header & Dashboard) */
  .branding-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(244, 180, 0, 0.35);
    padding: 6px 16px;
    border-radius: 50px;
    margin-bottom: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  }
  .badge-logo {
    height: 40px;
    width: auto;
    object-fit: contain;
    border-radius: 10px;
  }
  .badge-text {
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 800;
    color: #1a1d3b;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  
  .welcome-heading {
    font-family: 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: 900;
    color: #1a1d3b;
    margin-bottom: 6px;
    text-align: left !important;
  }
  .welcome-subtitle {
    color: #6b7280;
    font-size: 13px;
    margin-bottom: 24px;
    text-align: left !important;
  }

  .steps-wrapper {
    margin-bottom: 24px;
  }
  .steps-wrapper .steps {
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    margin-bottom: 0;
    align-items: center;
  }

  /* Gold gradient button */
  .btn-gold-grad {
    width: 100%;
    padding: 15px;
    margin-top: 10px;
    background: linear-gradient(135deg, #F4B400 0%, #FFD54F 100%) !important;
    color: #1a1d3b !important;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 800;
    font-family: 'Nunito', sans-serif;
    letter-spacing: 0.5px;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(244, 180, 0, 0.25);
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .btn-gold-grad:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(244, 180, 0, 0.4), 0 0 15px rgba(255, 213, 79, 0.3);
  }
  .btn-gold-grad:active {
    transform: translateY(-1px);
  }

  /* RESPONSIVE MEDIA QUERIES */
  @media (max-width: 1024px) {
    .login-left-section {
      width: 50%;
    }
    .login-right-section {
      width: 50%;
    }
  }
  
  @media (max-width: 768px) {
    .login-left-section {
      display: none;
    }
    .login-right-section {
      width: 100%;
    }
    .left-content-panel .glass-panel {
      padding: 24px;
    }
  }

  @media (max-width: 640px) {
    .login-split-container {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .login-left-section {
      display: none;
    }
    .login-right-section {
      width: 100%;
      padding: 0;
    }
    .login-glass-card {
      padding: 30px 20px !important;
    }
  }

  /* ── CBT STYLE EXAM LAYOUT ── */
  .cbt-container {
    max-width: 1200px !important;
    margin: 0 auto;
    padding: 10px;
  }
  .cbt-grid {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 20px;
    align-items: start;
  }
  @media (max-width: 900px) {
    .cbt-grid {
      grid-template-columns: 1fr;
    }
  }
  .cbt-left-panel {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .question-card-active {
    background: #fff;
    border-radius: 16px;
    border: 1.5px solid #e5e7eb;
    padding: 26px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    min-height: 380px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .q-header-active {
    margin-bottom: 20px;
  }
  .q-num-label {
    display: inline-block;
    color: #4f8ef7;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 6px;
  }
  .q-text-active {
    font-size: 17px;
    font-weight: 600;
    color: #1a1d3b;
    line-height: 1.5;
  }
  .options-container-active {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .option-label-active {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 18px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    cursor: pointer;
    background: #f9fafb;
    transition: all 0.2s;
    user-select: none;
  }
  .option-label-active:hover {
    border-color: #4f8ef7;
    background: #eff6ff;
  }
  .option-label-active.selected {
    border-color: #3b82f6;
    background: #eff6ff;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);
  }
  .opt-badge-active {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid #d1d5db;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: 12px;
    color: #6b7280;
    background: #fff;
    flex-shrink: 0;
  }
  .option-label-active.selected .opt-badge-active {
    background: linear-gradient(135deg, #4f8ef7, #a259f7);
    color: #fff;
    border-color: transparent;
  }
  .opt-text-active {
    font-size: 14px;
    color: #374151;
  }
  .option-label-active.selected .opt-text-active {
    color: #1d4ed8;
  }
  .bottom-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  .btn-nav {
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 700;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    border: 1.5px solid #e5e7eb;
    background: #fff;
    color: #4b5563;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .btn-nav:hover:not(:disabled) {
    border-color: #4f8ef7;
    color: #4f8ef7;
    background: #f0f7ff;
  }
  .btn-nav:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .cbt-right-panel {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .sidebar-card {
    padding: 20px !important;
    border: 1.5px solid #e5e7eb;
  }
  .sidebar-info-row {
    display: flex;
    justify-content: center;
    margin-bottom: 12px;
  }
  .cbt-subject-badge {
    display: inline-block;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    padding: 5px 14px;
    border-radius: 50px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  }
  .timer-card-box {
    background: linear-gradient(135deg, #ecfdf5, #d1fae5);
    border: 1.5px solid #10b981;
    color: #065f46;
    padding: 12px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.08);
  }
  .timer-card-box.warning {
    background: linear-gradient(135deg, #fef2f2, #fee2e2);
    border-color: #ef4444;
    color: #991b1b;
    animation: pulse 1s infinite;
  }
  .timer-label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.8;
    margin-bottom: 2px;
  }
  .timer-time {
    font-family: 'Nunito', sans-serif;
    font-weight: 900;
    font-size: 24px;
    letter-spacing: 1px;
  }
  .lang-toggle-container {
    margin-top: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1.5px dashed #e5e7eb;
    padding-top: 12px;
  }
  .lang-toggle-label {
    font-size: 12px;
    font-weight: 700;
    color: #4b5563;
  }
  .lang-toggle-buttons {
    display: flex;
    background: #f1f5f9;
    border-radius: 6px;
    padding: 2px;
    gap: 2px;
    border: 1px solid #e2e8f0;
  }
  .lang-toggle-btn {
    padding: 4px 10px;
    border: none;
    background: transparent;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    color: #64748b;
    transition: all 0.2s;
  }
  .lang-toggle-btn.active {
    background: #fff;
    color: #0f172a;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  .grid-sidebar-card h3 {
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    font-weight: 800;
    color: #1a1d3b;
    margin-bottom: 12px;
    text-align: center;
  }
  .q-grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 6px;
    margin-bottom: 12px;
  }
  .q-grid-btn {
    aspect-ratio: 1;
    border-radius: 6px;
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: 12px;
    cursor: pointer;
    border: 1.5px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
  }
  .q-grid-btn.active-blue {
    background: #3b82f6;
    color: #fff;
    border-color: #2563eb;
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
  }
  .q-grid-btn.answered-green {
    background: #10b981;
    color: #fff;
    border-color: #059669;
  }
  .q-grid-btn.unanswered-gray {
    background: #f3f4f6;
    color: #4b5563;
    border-color: #e5e7eb;
  }
  .q-grid-btn:hover {
    transform: scale(1.05);
  }
  .grid-legend {
    display: flex;
    justify-content: center;
    gap: 10px;
    font-size: 10px;
    color: #6b7280;
    margin-bottom: 16px;
    border-bottom: 1.5px dashed #e5e7eb;
    padding-bottom: 10px;
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .legend-dot.current { background: #3b82f6; }
  .legend-dot.answered { background: #10b981; }
  .legend-dot.unanswered { background: #f3f4f6; border: 1px solid #d1d5db; }
  
  .btn-submit-cbt {
    width: 100%;
    padding: 11px;
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
  }
  .btn-submit-cbt:hover {
    background: linear-gradient(135deg, #dc2626, #b91c1c);
    box-shadow: 0 6px 16px rgba(239, 68, 68, 0.3);
    transform: translateY(-1px);
  }
`;

// Base Web App URL (Paste your deployed Google Apps Script URL here)
const BASE_API_URL = "https://script.google.com/macros/s/AKfycbyScnEODQXjpOc5Wc0npqoKD8-X6Bg5f7zr8G1DwUrUu_R95XGInEk6b4CDAKI3b0qd/exec";

const QUESTIONS_API = `${BASE_API_URL}?action=getQuestions`;
const RESULTS_API = `${BASE_API_URL}?action=getResults`;
const EXAM_API = BASE_API_URL;

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "ksk@123";

const SUBJECTS_LIST = [
  "General Knowledge",
  "General Science",
  "Current Affairs",
  "Mathematics",
  "Reasoning"
];

function saveAttemptData(name, mobile, subject, questions, answers, scoreStr, percentage, verdict, isoDate) {
  const correctAnswers = questions.map(q => String(q["Correct Answer"] || q.correct || q.correctAnswer || "").trim());
  const attempt = {
    candidateName: name,
    candidateMobile: mobile,
    selectedSubject: subject,
    questions: questions,
    answers: answers,
    correctAnswers: correctAnswers,
    score: scoreStr,
    percentage: percentage,
    verdict: verdict,
    date: isoDate
  };
  localStorage.setItem("last_exam_attempt", JSON.stringify(attempt));
  localStorage.setItem("last_exam_view", "result");
}

export default function App() {
  const [englishQuestions, setEnglishQuestions]   = useState([]);
  const [hindiQuestions, setHindiQuestions]       = useState([]);


  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedSubject, setSelectedSubject]           = useState("");
  const [candidateName, setCandidateName]         = useState("");
  const [candidateMobile, setCandidateMobile]     = useState("");
  const [view, setView]                           = useState("login");
  const [score, setScore]                         = useState(null);
  const [totalQs, setTotalQs]                     = useState(0);
  const [percentageState, setPercentageState]     = useState(0);
  const [verdictState, setVerdictState]           = useState("");

  const [timeLeft, setTimeLeft]                   = useState(1200); // 20 minutes (1200s)
  const [answered, setAnswered]                   = useState(0);
  const [isSubmitting, setIsSubmitting]           = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [reviewQuestionIndex, setReviewQuestionIndex] = useState(0);
  const [language, setLanguage]                   = useState("English");
  const [userAnswers, setUserAnswers]             = useState({});

  // ── Admin State ──
  const [adminUser, setAdminUser]       = useState("");
  const [adminPass, setAdminPass]       = useState("");
  const [dashboardData, setDashboardData] = useState([]);
  const [dashLoading, setDashLoading]   = useState(false);
  const [searchQuery, setSearchQuery]   = useState("");
  const [resultFilter, setResultFilter] = useState("ALL");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiError, setApiError]         = useState("");
  const [isFetchingHindi, setIsFetchingHindi] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);


  // ── CLEAR LEGACY STORAGE ──
  useEffect(() => {
    const legacyKeys = [
      "applied_post",
      "candidate_email",
      "exam_questions_hindi",
      "candidateEmail",
      "selectedDept",
      "email",
      "post"
    ];
    legacyKeys.forEach(k => {
      localStorage.removeItem(k);
      sessionStorage.removeItem(k);
    });
  }, []);

  // ── Fetch Questions on Load ──
  useEffect(() => {
    const API_URL = QUESTIONS_API;
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        let eng = [];
        if (data && data.english) {
          eng = Array.isArray(data.english) ? data.english : [];
          setApiError("");
        } else {
          // If it doesn't have the expected format, it might be the old array format or empty
          const rawArray = Array.isArray(data) ? data : (data && data.data) || [];
          if (rawArray.length > 0) {
            eng = rawArray;
            setApiError(""); // Clear error since we successfully loaded English questions
          } else {
            setApiError("Error: Deployed Apps Script did not return any questions. Verify sheet name matches 'Question' and contains data.");
          }
        }

        // Normalize English questions to make sure they have "Subject Name"
        const normalize = (qList) => qList.map(q => {
          const subject = q["Subject Name"] || q.subjectName || q.subject || q.Department || q.department || "";
          return {
            ...q,
            "Subject Name": String(subject).trim()
          };
        });

        const normalizedEng = normalize(eng);
        setEnglishQuestions(normalizedEng);
        setHindiQuestions([]); // Initial load only contains English questions
        setIsLoadingQuestions(false);
      })
      .catch((err) => {
        setApiError("Questions fetch failed: " + err.message + ". Please verify that the Google Apps Script Web App is deployed and accessible publicly.");
        setIsLoadingQuestions(false);
      });
  }, []);

  // Helper to submit expired test on reload
  const submitSavedTest = useCallback((name, valMobile, valSubj, savedQs, savedAnsws) => {
    setIsSubmitting(true);
    let obtainedMarks = 0;
    let totalMarks = 0;

    savedQs.forEach((q, index) => {
      const userAnswer = savedAnsws[index];
      const correctAnswer = String(q["Correct Answer"] || q.correct || q.correctAnswer || "").trim();
      const qMarks = parseFloat(q["Marks"] || 1);
      totalMarks += qMarks;
      if (userAnswer && String(userAnswer).trim() === correctAnswer) {
        obtainedMarks += qMarks;
      }
    });

    const percentage = totalMarks > 0 ? (obtainedMarks / totalMarks) * 100 : 0;
    const passMarksThreshold = parseFloat(savedQs[0]?.["Pass Marks"] || 40);
    const finalResult = percentage >= passMarksThreshold ? "PASS" : "FAIL";

    const scoreStr = obtainedMarks + "/" + totalMarks;
    const finalPct = percentage.toFixed(1);
    const isoDate = new Date().toISOString();

    saveAttemptData(name, valMobile, valSubj, savedQs, savedAnsws, scoreStr, finalPct, finalResult, isoDate);

    const payload = {
      action: "saveResult",
      name: name,
      mobile: valMobile,
      subject: valSubj,
      score: scoreStr,
      result: finalResult,
      date: isoDate
    };

    fetch(EXAM_API, {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then(() => {
        clearExamStorage();
        setScore(obtainedMarks);
        setTotalQs(totalMarks);
        setPercentageState(finalPct);
        setVerdictState(finalResult);
        setView("result");
        setIsSubmitting(false);
      })
      .catch(() => {
        clearExamStorage();
        setScore(obtainedMarks);
        setTotalQs(totalMarks);
        setPercentageState(finalPct);
        setVerdictState(finalResult);
        setView("result");
        setIsSubmitting(false);
      });
  }, []);

  // ── Session Recovery on Load ──
  useEffect(() => {
    const inProgress = localStorage.getItem("exam_in_progress");
    if (inProgress === "true") {
      const name = localStorage.getItem("candidate_name") || "";
      const mobile = localStorage.getItem("candidate_mobile") || "";
      const subject = localStorage.getItem("candidate_subject") || "";
      const startTime = parseInt(localStorage.getItem("exam_start_time") || "0");
      const savedQuestions = JSON.parse(localStorage.getItem("exam_questions") || "[]");
      const savedAnswers = JSON.parse(localStorage.getItem("exam_answers") || "{}");
      const savedIndex = parseInt(localStorage.getItem("exam_current_index") || "0");
      const savedLanguage = localStorage.getItem("exam_language") || "English";

      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = 1200 - elapsed;

      if (remaining > 0) {
        setCandidateName(name);
        setCandidateMobile(mobile);
        setSelectedSubject(subject);
        setFilteredQuestions(savedQuestions);
        setUserAnswers(savedAnswers);
        setAnswered(Object.keys(savedAnswers).length);
        setCurrentQuestionIndex(savedIndex);
        setLanguage(savedLanguage);
        setTimeLeft(remaining);
        setView("exam");
      } else {
        submitSavedTest(name, mobile, subject, savedQuestions, savedAnswers);
      }
    } else {
      const lastView = localStorage.getItem("last_exam_view");
      const lastAttemptStr = localStorage.getItem("last_exam_attempt");
      if ((lastView === "result" || lastView === "detailed-result") && lastAttemptStr) {
        try {
          const attempt = JSON.parse(lastAttemptStr);
          setCandidateName(attempt.candidateName || "");
          setCandidateMobile(attempt.candidateMobile || "");
          setSelectedSubject(attempt.selectedSubject || "");
          setFilteredQuestions(attempt.questions || []);
          setUserAnswers(attempt.answers || {});
          if (attempt.score && typeof attempt.score === "string" && attempt.score.includes("/")) {
            const parts = attempt.score.split("/");
            setScore(parseFloat(parts[0]) || 0);
            setTotalQs(parseFloat(parts[1]) || 20);
          } else {
            setScore(parseFloat(attempt.score) || 0);
            setTotalQs(attempt.questions?.length || 20);
          }
          setPercentageState(attempt.percentage || "0.0");
          setVerdictState(attempt.verdict || "");
          setView(lastView);
        } catch (e) {
          // parse failed
        }
      }
    }
  }, [englishQuestions, submitSavedTest]);

  // Sync view state to local storage for last exam view
  useEffect(() => {
    if (view === "result" || view === "detailed-result" || view === "login") {
      localStorage.setItem("last_exam_view", view);
    }
  }, [view]);

  // ── Fetch Dashboard Data ──
  const fetchDashboardData = useCallback(async (showSpinner = true) => {
    if (showSpinner) setDashLoading(true);
    setIsRefreshing(true);
    try {
      const res  = await fetch(RESULTS_API);
      const data = await res.json();
      setDashboardData(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setDashboardData([]);
    } finally {
      setDashLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (view === "dashboard") {
      fetchDashboardData(true);
    }
  }, [view, fetchDashboardData]);

  // ── Login Handler ──
  function handleSubject(dept) {
    setSelectedSubject(dept);
    setScore(null);
  }

  // ── Start Exam Handler ──
  function startExam() {
    if (!candidateName || !candidateMobile || !selectedSubject) {
      alert("Please fill all details before starting.");
      return;
    }

    const questions = englishQuestions;
    const filteredQuestions = questions.filter(
      q => q["Subject Name"] && String(q["Subject Name"]).trim().toLowerCase() === String(selectedSubject).trim().toLowerCase()
    );

    if (filteredQuestions.length === 0) {
      alert("No questions found for the selected subject.");
      return;
    }

    // Shuffle and select exactly 20 questions (or all if fewer available)
    const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
    const examQs = shuffled.slice(0, 20);

    const startTime = Date.now();

    // Save to Local Storage
    localStorage.removeItem("last_exam_attempt");
    localStorage.removeItem("last_exam_view");

    localStorage.setItem("candidate_name", candidateName);
    localStorage.setItem("candidate_mobile", candidateMobile);
    localStorage.setItem("candidate_subject", selectedSubject);
    localStorage.setItem("exam_questions", JSON.stringify(examQs));
    localStorage.setItem("exam_answers", JSON.stringify({}));
    localStorage.setItem("exam_current_index", "0");
    localStorage.setItem("exam_language", "English");
    localStorage.setItem("exam_start_time", String(startTime));
    localStorage.setItem("exam_in_progress", "true");

    // State Updates
    setFilteredQuestions(examQs);
    setUserAnswers({});
    setAnswered(0);
    setCurrentQuestionIndex(0);
    setLanguage("English");
    setTimeLeft(1200);

    setView("exam");
  }

  // ── Submit Test ──
  const submitTest = useCallback(() => {
    setIsSubmitting(true);
    let obtainedMarks = 0;
    let totalMarks = 0;

    filteredQuestions.forEach((q, index) => {
      const userAnswer = userAnswers[index];
      const correctAnswer = String(q["Correct Answer"] || q.correct || q.correctAnswer || "").trim();
      const qMarks = parseFloat(q["Marks"] || 1);
      totalMarks += qMarks;
      if (userAnswer && String(userAnswer).trim() === correctAnswer) {
        obtainedMarks += qMarks;
      }
    });

    const percentage = totalMarks > 0 ? (obtainedMarks / totalMarks) * 100 : 0;
    const passMarksThreshold = parseFloat(filteredQuestions[0]?.["Pass Marks"] || 40);
    const finalResult = percentage >= passMarksThreshold ? "PASS" : "FAIL";

    const scoreStr = obtainedMarks + "/" + totalMarks;
    const finalPct = percentage.toFixed(1);
    const isoDate = new Date().toISOString();

    saveAttemptData(candidateName, candidateMobile, selectedSubject, filteredQuestions, userAnswers, scoreStr, finalPct, finalResult, isoDate);

    const payload = {
      action: "saveResult",
      name: candidateName,
      mobile: candidateMobile,
      subject: selectedSubject,
      score: scoreStr,
      result: finalResult,
      date: isoDate
    };

    fetch(EXAM_API, {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then(() => {
        clearExamStorage();
        setScore(obtainedMarks);
        setTotalQs(totalMarks);
        setPercentageState(finalPct);
        setVerdictState(finalResult);
        setView("result");
        setIsSubmitting(false);
      })
      .catch(() => {
        clearExamStorage();
        setScore(obtainedMarks);
        setTotalQs(totalMarks);
        setPercentageState(finalPct);
        setVerdictState(finalResult);
        setView("result");
        setIsSubmitting(false);
      });
  }, [filteredQuestions, userAnswers, candidateName, candidateMobile, selectedSubject]);

  // ── Security & Refresh Warnings ──
  useEffect(() => {
    if (view !== "exam") return;

    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to refresh? Your exam session is in progress.";
      return e.returnValue;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [view]);

  // ── Timer Effect ──
  useEffect(() => {
    if (view === "exam" && timeLeft > 0) {
      const timer = setInterval(() => {
        const startTime = parseInt(localStorage.getItem("exam_start_time") || "0");
        if (startTime) {
          const elapsed = Math.floor((Date.now() - startTime) / 1000);
          const remaining = 1200 - elapsed;
          if (remaining <= 0) {
            setTimeLeft(0);
            clearInterval(timer);
          } else {
            setTimeLeft(remaining);
          }
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [view, timeLeft]);

  // Handle countdown completion
  useEffect(() => {
    if (view === "exam" && timeLeft === 0) {
      alert("Time Up! Test Submitted Automatically.");
      submitTest();
    }
  }, [view, timeLeft, submitTest]);

  // ── Auto-save Answer Handler ──
  function handleAnswerSelect(qIndex, key) {
    const updated = { ...userAnswers, [qIndex]: key };
    setUserAnswers(updated);
    localStorage.setItem("exam_answers", JSON.stringify(updated));
    setAnswered(Object.keys(updated).length);
  }

  function handleLanguageChange(lang) {
    if (lang === "Hindi" && hindiQuestions.length === 0 && !isFetchingHindi) {
      setIsFetchingHindi(true);
      fetch(QUESTIONS_API)
        .then((res) => res.json())
        .then((data) => {
          let hin = [];
          if (data && data.hindi) {
            hin = Array.isArray(data.hindi) ? data.hindi : [];
          }
          
          // Normalize Hindi questions
          const normalizedHin = hin.map(q => {
            const subject = q["Subject Name"] || q.subjectName || q.subject || q.Department || q.department || "";
            return {
              ...q,
              "Subject Name": String(subject).trim()
            };
          });
          
          setHindiQuestions(normalizedHin);
        })
        .catch((err) => {
          // Fetch failed silently
        })
        .finally(() => {
          setIsFetchingHindi(false);
        });
    }
    setLanguage(lang);
    localStorage.setItem("exam_language", lang);
  }

  function handleQuestionIndexChange(idx) {
    setCurrentQuestionIndex(idx);
    localStorage.setItem("exam_current_index", String(idx));
  }

  function clearExamStorage() {
    localStorage.removeItem("exam_in_progress");
    localStorage.removeItem("exam_start_time");
    localStorage.removeItem("exam_questions");
    localStorage.removeItem("exam_answers");
    localStorage.removeItem("exam_current_index");
    localStorage.removeItem("exam_language");
  }

  function resetForNewCandidate() {
    setCandidateName("");
    setCandidateMobile("");
    setSelectedSubject("");
    setFilteredQuestions([]);
    setScore(null);
    setTotalQs(0);
    setPercentageState(0);
    setVerdictState("");
    setTimeLeft(1200);
    setAnswered(0);
    setIsSubmitting(false);
    setAdminUser("");
    setAdminPass("");
    setDashboardData([]);
    setSearchQuery("");
    setResultFilter("ALL");
    setReviewQuestionIndex(0);
    
    clearExamStorage();
    setView("login");
  }

  // ── Admin Login Handler ──
  function handleAdminLogin() {
    if (
      adminUser.trim() === ADMIN_USERNAME &&
      adminPass         === ADMIN_PASSWORD
    ) {
      setAdminUser("");
      setAdminPass("");
      setView("dashboard");
    } else {
      alert("Invalid Credentials");
    }
  }

  // Helper to resolve question text by language toggle
  function getQuestionDisplay(q) {
    if (language === "Hindi" && hindiQuestions.length > 0) {
      const match = hindiQuestions.find((hq) => String(hq.ID) === String(q.ID));
      if (match) return match;
    }
    return q;
  }

  // Helper to format Date objects or strings into clean { dateStr, timeStr }
  function formatDateTime(dateInput) {
    if (!dateInput) return { dateStr: "—", timeStr: "" };
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      return { dateStr: String(dateInput), timeStr: "" };
    }
    const day = String(date.getDate()).padStart(2, '0');
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthStr = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hourStr = String(hours).padStart(2, '0');

    return {
      dateStr: `${day} ${monthStr} ${year}`,
      timeStr: `${hourStr}:${minutes} ${ampm}`
    };
  }

  // Helper to parse dates safely in dashboard
  function parseDate(dateStr) {
    if (!dateStr) return new Date(0);
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? new Date(0) : parsed;
  }

  // Timer String Formatting
  const mins       = Math.floor(timeLeft / 60);
  const secs       = String(timeLeft % 60).padStart(2, "0");

  // Dashboard Data Table Mapping
  const mappedRows = dashboardData.map((item) => [
    item.name || "—",
    item.subject || "—",
    item.mobile || "—",
    item.score || "—",
    item.result || "—",
    item.date || "—"
  ]);

  const totalCandidatesCount = mappedRows.length;
  const totalPassCount = mappedRows.filter(
    (row) => (row[4] || "").toUpperCase() === "PASS"
  ).length;
  const totalFailCount = mappedRows.filter(
    (row) => (row[4] || "").toUpperCase() === "FAIL"
  ).length;
  const passRatePct = totalCandidatesCount > 0
    ? Math.round((totalPassCount / totalCandidatesCount) * 100)
    : 0;

  const sortedRows = [...mappedRows].sort((a, b) => {
    return parseDate(b[5]) - parseDate(a[5]);
  });

  const deDuplicatedRows = sortedRows; // display all rows as multiple attempts are allowed

  const deDuplicatedPassCount = deDuplicatedRows.filter(
    (row) => (row[4] || "").toUpperCase() === "PASS"
  ).length;
  const deDuplicatedFailCount = deDuplicatedRows.filter(
    (row) => (row[4] || "").toUpperCase() === "FAIL"
  ).length;

  const filteredDash = deDuplicatedRows.filter((row) => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      (row[0] || "").toLowerCase().includes(q) || // Name
      (row[1] || "").toLowerCase().includes(q) || // Subject
      (row[2] || "").toLowerCase().includes(q);   // Mobile Number
    const matchResult =
      resultFilter === "ALL" ||
      (row[4] || "").toUpperCase() === resultFilter;
    return matchSearch && matchResult;
  });

  return (
    <>
      <style>{styles}</style>

      {(view === "login" || view === "adminLogin") ? (
        <div className="login-split-container">
          {/* Left Section (60%) */}
          <div className="login-left-section">
            <div className="left-overlay" />
            <div className="left-content-panel">
              <div className="glass-panel">
                <div className="branding-container">
                  <img src={oswalLogo} className="branding-logo" alt="OSWAL Logo" />
                  <span className="branding-text">Competitive Exam</span>
                </div>
                <h2>Test Your Knowledge. <span className="highlight-gold">Achieve Your Goals.</span></h2>
                <p className="left-sub">Practice, learn and improve your performance with every exam attempt.</p>
                <div className="left-quote">
                  <p>"Success is the sum of small efforts repeated day after day."</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section (40%) */}
          <div className="login-right-section">
            {view === "login" && (
              <div className="card form-card login-glass-card">
                <div className="logo-container">
                  <img src={oswalLogo} className="company-logo" alt="OSWAL Logo" />
                  <span className="company-logo-text">Competitive Exam</span>
                </div>
                <h2 className="welcome-heading">Welcome Student</h2>
                <p className="welcome-subtitle">Please enter your details to start the examination</p>

                <div className="steps-wrapper">
                  <div className="steps">
                    <div className="step active">
                      <div className="step-dot">1</div>
                      <span>Details</span>
                    </div>
                    <div className="step-line" />
                    <div className="step">
                      <div className="step-dot">2</div>
                      <span>Exam</span>
                    </div>
                    <div className="step-line" />
                    <div className="step">
                      <div className="step-dot">3</div>
                      <span>Result</span>
                    </div>
                  </div>
                </div>

                {/* Student Name */}
                <div className="field-group">
                  <label>Student Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                  />
                </div>

                {/* Mobile */}
                <div className="field-group">
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 9876543210"
                    value={candidateMobile}
                    onChange={(e) => setCandidateMobile(e.target.value)}
                  />
                </div>

                {/* Subject Dropdown */}
                <div className="field-group">
                  <label>Select Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => handleSubject(e.target.value)}
                  >
                    <option value="">— Select Subject —</option>
                    {SUBJECTS_LIST.map((subj, i) => (
                      <option key={i} value={subj}>
                        {subj}
                      </option>
                    ))}
                  </select>
                  {isLoadingQuestions ? (
                    <div style={{ 
                      color: '#2563eb', 
                      fontSize: '12.5px', 
                      marginTop: '8px', 
                      fontWeight: '600',
                      background: '#eff6ff',
                      border: '1.5px solid #bfdbfe',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      lineHeight: '1.4',
                      textAlign: 'left'
                    }}>
                      🔄 Loading questions...
                    </div>
                  ) : (englishQuestions.length === 0 || apiError) ? (
                    <div style={{ 
                      color: '#dc2626', 
                      fontSize: '12.5px', 
                      marginTop: '8px', 
                      fontWeight: '600',
                      background: '#fef2f2',
                      border: '1.5px solid #fca5a5',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      lineHeight: '1.4',
                      textAlign: 'left'
                    }}>
                      ⚠️ {apiError || "Unable to load questions from Google Sheets. Please check connection."}
                    </div>
                  ) : null}
                </div>

                <button className="btn-gold-grad" onClick={startExam}>
                  🚀 Start Exam
                </button>
              </div>
            )}

            {view === "adminLogin" && (
              <div className="admin-login-wrap card login-glass-card">
                <div className="logo-container">
                  <img src={oswalLogo} className="company-logo" alt="OSWAL Logo" />
                  <span className="company-logo-text">Competitive Exam</span>
                </div>
                
                <h2 className="welcome-heading">Welcome Back</h2>
                <p className="welcome-subtitle">Administrative Control Panel Access</p>

                <div className="field-group">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    value={adminUser}
                    autoComplete="off"
                    onChange={(e) => setAdminUser(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                  />
                </div>

                <div className="field-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={adminPass}
                    autoComplete="off"
                    onChange={(e) => setAdminPass(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                  />
                </div>

                <button className="btn-gold-grad" onClick={handleAdminLogin}>
                  🔓 Login to Dashboard
                </button>

                <button
                  className="btn-back-link"
                  onClick={() => setView("result")}
                >
                  ← Back to Result
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="portal-wrapper">
          {view !== "dashboard" && (
            <div className="portal-header">
              <div className="branding-badge">
                <img src={oswalLogo} className="badge-logo" alt="OSWAL Logo" />
                <span className="badge-text">Competitive Exam</span>
              </div>
              <h1>Online <span>Examination</span> System</h1>
              <p>Competitive Examination Portal — Attempt all questions carefully</p>
            </div>
          )}

        {/* ── EXAM VIEW ── */}
        {view === "exam" && (
          <div className="exam-wrapper cbt-container">
            <div className="cbt-grid">
              
              {/* LEFT PANEL */}
              <div className="cbt-left-panel">
                <div className="card question-card-active">
                  {filteredQuestions.length > 0 && (
                    <>
                      {(() => {
                        const rawQ = filteredQuestions[currentQuestionIndex];
                        const displayQ = getQuestionDisplay(rawQ);
                        return (
                          <>
                            <div className="q-header-active">
                              <span className="q-num-label">Question {currentQuestionIndex + 1} of {filteredQuestions.length}</span>
                              <div className="q-text-active">{displayQ.Question || displayQ.question}</div>
                            </div>
                            
                            <div className="options-container-active">
                              {[
                                { key: "A", text: displayQ["Option A"] || displayQ.optionA || displayQ.optiona },
                                { key: "B", text: displayQ["Option B"] || displayQ.optionB || displayQ.optionb },
                                { key: "C", text: displayQ["Option C"] || displayQ.optionC || displayQ.optionc },
                                { key: "D", text: displayQ["Option D"] || displayQ.optionD || displayQ.optiond },
                              ].map(({ key, text }) => {
                                const isChecked = userAnswers[currentQuestionIndex] === key;
                                return (
                                  <label 
                                    className={`option-label-active ${isChecked ? 'selected' : ''}`} 
                                    key={key}
                                  >
                                    <input 
                                      type="radio" 
                                      name={`q_${currentQuestionIndex}`} 
                                      value={key} 
                                      checked={isChecked}
                                      onChange={() => handleAnswerSelect(currentQuestionIndex, key)}
                                      style={{ display: 'none' }}
                                    />
                                    <span className="opt-badge-active">{key}</span>
                                    <span className="opt-text-active">{text}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </>
                        );
                      })()}
                    </>
                  )}
                </div>

                {/* BOTTOM NAVIGATION */}
                <div className="bottom-navigation">
                  <button 
                    className="btn-nav prev"
                    disabled={currentQuestionIndex === 0}
                    onClick={() => handleQuestionIndexChange(currentQuestionIndex - 1)}
                  >
                    ← Previous
                  </button>
                  
                  <button 
                    className="btn-nav next"
                    disabled={currentQuestionIndex === filteredQuestions.length - 1}
                    onClick={() => handleQuestionIndexChange(currentQuestionIndex + 1)}
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div className="cbt-right-panel">
                <div className="card sidebar-card info-sidebar-card">
                  <div className="sidebar-info-row">
                    <span className="cbt-subject-badge">{selectedSubject}</span>
                  </div>
                  
                  <div className={`timer-card-box ${timeLeft <= 300 ? 'warning' : ''}`}>
                    <div className="timer-label">Time Remaining</div>
                    <div className="timer-time">⏱ {mins}:{secs}</div>
                  </div>

                  {/* Language Toggle */}
                  <div className="lang-toggle-container">
                    <div className="lang-toggle-label">Language:</div>
                    <div className="lang-toggle-buttons">
                      <button 
                        className={`lang-toggle-btn ${language === 'English' ? 'active' : ''}`}
                        onClick={() => handleLanguageChange('English')}
                      >
                        English
                      </button>
                      <button 
                        className={`lang-toggle-btn ${language === 'Hindi' ? 'active' : ''}`}
                        onClick={() => handleLanguageChange('Hindi')}
                      >
                        हिन्दी
                      </button>
                    </div>
                  </div>
                </div>

                {/* Question Grid */}
                <div className="card sidebar-card grid-sidebar-card">
                  <h3>Question Navigation ({answered} of {filteredQuestions.length} answered)</h3>
                  <div className="q-grid-container">
                    {filteredQuestions.map((_, idx) => {
                      const isAnswered = userAnswers[idx] !== undefined;
                      const isActive = idx === currentQuestionIndex;
                      
                      let btnClass = "q-grid-btn";
                      if (isActive) btnClass += " active-blue";
                      else if (isAnswered) btnClass += " answered-green";
                      else btnClass += " unanswered-gray";

                      return (
                        <button
                          key={idx}
                          className={btnClass}
                          onClick={() => handleQuestionIndexChange(idx)}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="grid-legend">
                    <div className="legend-item"><span className="legend-dot current"></span> Current</div>
                    <div className="legend-item"><span className="legend-dot answered"></span> Answered</div>
                    <div className="legend-item"><span className="legend-dot unanswered"></span> Unanswered</div>
                  </div>
                  
                  <button 
                    className="btn-submit-cbt"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to submit your exam?")) {
                        submitTest();
                      }
                    }}
                  >
                    Submit Exam
                  </button>
                </div>
              </div>

            </div>

            {isSubmitting && (
              <div className="submit-overlay">
                <div className="submit-spinner" />
                <h3>Submitting Your Test...</h3>
                <p>Please wait, saving results to Google Sheets</p>
                <div className="submit-dots">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── RESULT VIEW ── */}
        {view === "result" && (
          <div className="exam-wrapper">
            <div className="result-card" style={{ maxWidth: '600px', margin: '36px auto 0' }}>
              <div className="result-icon">
                {verdictState === "PASS" ? "🎉" : "📝"}
              </div>
              <h2 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, marginBottom: '8px' }}>
                Exam Result
              </h2>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '24px', textAlign: 'left' }}>
                <div style={{ display: 'flex', margin: '8px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>Student Name:</span>
                  <span style={{ fontWeight: 700, color: '#0f172a', marginLeft: 'auto' }}>{candidateName}</span>
                </div>
                <div style={{ display: 'flex', margin: '8px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>Subject:</span>
                  <span style={{ fontWeight: 700, color: '#0f172a', marginLeft: 'auto' }}>{selectedSubject}</span>
                </div>
                <div style={{ display: 'flex', margin: '8px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>Score:</span>
                  <span style={{ fontWeight: 700, color: '#0f172a', marginLeft: 'auto' }}>{score} / {totalQs}</span>
                </div>
                <div style={{ display: 'flex', margin: '8px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>Percentage:</span>
                  <span style={{ fontWeight: 700, color: '#0f172a', marginLeft: 'auto' }}>{percentageState}%</span>
                </div>
                <div style={{ display: 'flex', margin: '8px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>Result:</span>
                  <span style={{ 
                    fontWeight: 900, 
                    marginLeft: 'auto',
                    color: verdictState === "PASS" ? '#16a34a' : '#dc2626'
                  }}>{verdictState}</span>
                </div>
                {(() => {
                  let attemptDateVal = new Date();
                  try {
                    const attempt = JSON.parse(localStorage.getItem("last_exam_attempt") || "{}");
                    if (attempt.date) attemptDateVal = attempt.date;
                  } catch (e) {}
                  const fDate = formatDateTime(attemptDateVal);
                  return (
                    <div style={{ display: 'flex', margin: '8px 0', paddingTop: '8px', alignItems: 'center' }}>
                      <span style={{ color: '#64748b', fontWeight: 600 }}>Date & Time:</span>
                      <span style={{ fontWeight: 700, color: '#0f172a', marginLeft: 'auto', textAlign: 'right' }}>
                        <div>{fDate.dateStr}</div>
                        <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>{fDate.timeStr}</div>
                      </span>
                    </div>
                  );
                })()}
              </div>
              
              <div style={{ 
                display: 'inline-block',
                fontFamily: "'Nunito', sans-serif",
                fontSize: '20px',
                fontWeight: 900,
                letterSpacing: '2px',
                padding: '8px 36px',
                borderRadius: '50px',
                marginBottom: '24px',
                background: verdictState === "PASS" ? '#dcfce7' : '#fee2e2',
                color: verdictState === "PASS" ? '#15803d' : '#b91c1c',
                border: verdictState === "PASS" ? '2px solid #86efac' : '2px solid #fca5a5'
              }}>
                {verdictState === "PASS" ? "✓ PASS" : "✗ FAIL"}
              </div>

              <button
                className="btn-start"
                style={{ 
                  marginTop: "12px", 
                  maxWidth: "260px", 
                  margin: "0 auto 12px",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  boxShadow: "0 4px 16px rgba(16, 185, 129, 0.25)"
                }}
                onClick={() => setView("detailed-result")}
              >
                🔍 View Detailed Result
              </button>
 
              <button
                className="btn-start"
                style={{ marginTop: "0px", maxWidth: "260px", margin: "0 auto" }}
                onClick={resetForNewCandidate}
              >
                👤 New Exam Login
              </button>

              <div
                className="btn-divider"
                style={{ maxWidth: "260px", margin: "16px auto 0" }}
              >
                <div className="btn-divider-line" />
                <span>Admin Access</span>
                <div className="btn-divider-line" />
              </div>

              <button
                className="btn-dashboard"
                style={{
                  maxWidth: "260px",
                  margin: "8px auto 0",
                  display: "block",
                }}
                onClick={() => setView("adminLogin")}
              >
                🔐 View Dashboard
              </button>
            </div>
          </div>
        )}
 
        {/* ── DETAILED RESULT VIEW ── */}
        {view === "detailed-result" && (
          <div className="exam-wrapper cbt-container">
            {(() => {
              const totalQuestionsCount = filteredQuestions.length || 20;
              let correctCount = 0;
              let wrongCount = 0;
              let skippedCount = 0;

              filteredQuestions.forEach((q, index) => {
                const userAnswer = userAnswers[index];
                const correctAnswer = String(q["Correct Answer"] || q.correct || q.correctAnswer || "").trim();
                if (userAnswer === undefined || userAnswer === null || userAnswer === "") {
                  skippedCount++;
                } else if (String(userAnswer).trim() === correctAnswer) {
                  correctCount++;
                } else {
                  wrongCount++;
                }
              });

              const activeQuestion = filteredQuestions[reviewQuestionIndex];
              const rawQ = activeQuestion ? getQuestionDisplay(activeQuestion) : null;
              const correctAnswer = rawQ ? String(activeQuestion["Correct Answer"] || activeQuestion.correct || activeQuestion.correctAnswer || "").trim() : "";
              const userAnswer = userAnswers[reviewQuestionIndex];
              const isCorrect = userAnswer && String(userAnswer).trim() === correctAnswer;
              
              let questionStatus = "not_attempted";
              if (userAnswer !== undefined && userAnswer !== null && userAnswer !== "") {
                questionStatus = isCorrect ? "correct" : "wrong";
              }

              const optionsList = [
                { key: "A", text: rawQ ? (rawQ["Option A"] || rawQ.optionA || rawQ.optiona) : "" },
                { key: "B", text: rawQ ? (rawQ["Option B"] || rawQ.optionB || rawQ.optionb) : "" },
                { key: "C", text: rawQ ? (rawQ["Option C"] || rawQ.optionC || rawQ.optionc) : "" },
                { key: "D", text: rawQ ? (rawQ["Option D"] || rawQ.optionD || rawQ.optiond) : "" }
              ];

              const getOptionText = (key) => {
                const opt = optionsList.find(o => o.key === key);
                return opt ? `Option ${key}: ${opt.text}` : `Option ${key}`;
              };

              return (
                <div style={{ maxWidth: '860px', margin: '0 auto' }}>
                  
                  {/* Top Summary Card */}
                  <div className="card" style={{ marginBottom: '24px', padding: '28px' }}>
                    <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: '22px', fontWeight: 900, marginBottom: '16px', color: '#1a1d3b', textAlign: 'center' }}>
                      Detailed Exam Report
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                      <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Candidate Name</span>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#1a1d3b', marginTop: '4px' }}>{candidateName}</div>
                      </div>
                      <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Subject</span>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#1a1d3b', marginTop: '4px' }}>{selectedSubject}</div>
                      </div>
                      <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Score</span>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#1a1d3b', marginTop: '4px' }}>{score} / {totalQs}</div>
                      </div>
                      <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Percentage & Status</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                          <span style={{ fontSize: '15px', fontWeight: 800, color: '#1a1d3b' }}>{percentageState}%</span>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 900,
                            padding: '2px 8px',
                            borderRadius: '50px',
                            background: verdictState === "PASS" ? '#dcfce7' : '#fee2e2',
                            color: verdictState === "PASS" ? '#16a34a' : '#dc2626'
                          }}>{verdictState}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cbt-grid" style={{ gridTemplateColumns: '1fr' }}>
                    <div className="cbt-left-panel">
                      
                      {/* Active Review Question Card */}
                      <div className="card question-card-active" style={{ minHeight: 'auto', padding: '24px' }}>
                        {rawQ ? (
                          <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                              <span className="q-num-label" style={{ margin: 0 }}>
                                Question {reviewQuestionIndex + 1} of {totalQuestionsCount}
                              </span>
                              <div>
                                {questionStatus === "correct" && (
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#dcfce7', color: '#15803d', border: '1px solid #86efac', padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: 700 }}>
                                    🟢 Correct
                                  </span>
                                )}
                                {questionStatus === "wrong" && (
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fee2e2', color: '#b91c1c', border: '1px solid #fca5a5', padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: 700 }}>
                                    🔴 Wrong
                                  </span>
                                )}
                                {questionStatus === "not_attempted" && (
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: 700 }}>
                                    ⚪ Not Attempted
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="q-header-active" style={{ marginBottom: '18px' }}>
                              <div className="q-text-active" style={{ fontSize: '16px' }}>{rawQ.Question || rawQ.question}</div>
                            </div>

                            <div className="options-container-active" style={{ gap: '8px' }}>
                              {optionsList.map(({ key, text }) => {
                                const isCorrectOpt = (key === correctAnswer);
                                const isSelectedOpt = (key === userAnswer);
                                
                                let optClass = "option-label-active";
                                let optStyle = { cursor: 'default' };

                                if (isCorrectOpt) {
                                  optStyle = {
                                    ...optStyle,
                                    borderColor: '#10b981',
                                    background: '#ecfdf5',
                                    color: '#065f46',
                                    fontWeight: '600'
                                  };
                                } else if (isSelectedOpt) {
                                  optStyle = {
                                    ...optStyle,
                                    borderColor: '#ef4444',
                                    background: '#fef2f2',
                                    color: '#991b1b',
                                    fontWeight: '600'
                                  };
                                }

                                return (
                                  <div key={key} className={optClass} style={optStyle}>
                                    <span 
                                      className="opt-badge-active"
                                      style={{
                                        background: isCorrectOpt ? '#10b981' : (isSelectedOpt ? '#ef4444' : '#fff'),
                                        color: (isCorrectOpt || isSelectedOpt) ? '#fff' : '#6b7280',
                                        borderColor: isCorrectOpt ? '#10b981' : (isSelectedOpt ? '#ef4444' : '#d1d5db')
                                      }}
                                    >
                                      {key}
                                    </span>
                                    <span className="opt-text-active" style={{ color: 'inherit' }}>{text}</span>
                                    <span style={{ marginLeft: 'auto', fontSize: '16px' }}>
                                      {isCorrectOpt && "✅"}
                                      {isSelectedOpt && !isCorrectOpt && "❌"}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Textual Highlights */}
                            <div style={{ marginTop: '20px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                              <div style={{ marginBottom: '10px' }}>
                                <strong style={{ color: '#475569', fontSize: '12px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Answer</strong>
                                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1d3b', marginTop: '2px' }}>
                                  {userAnswer ? (
                                    <>
                                      {getOptionText(userAnswer)} {userAnswer === correctAnswer ? "✅" : "❌"}
                                    </>
                                  ) : (
                                    <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Not Attempted ❌</span>
                                  )}
                                </div>
                              </div>
                              <div>
                                <strong style={{ color: '#475569', fontSize: '12px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Correct Answer</strong>
                                <div style={{ fontSize: '14px', fontWeight: 700, color: '#16a34a', marginTop: '2px' }}>
                                  {getOptionText(correctAnswer)} ✅
                                </div>
                              </div>
                            </div>

                            {/* Explanation Card */}
                            {rawQ.Explanation && (
                              <div style={{ marginTop: '16px', padding: '16px', background: '#eff6ff', borderRadius: '12px', border: '1px solid #bfdbfe', textAlign: 'left' }}>
                                <strong style={{ color: '#1e40af', fontSize: '12px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                                  💡 Explanation
                                </strong>
                                <p style={{ fontSize: '13.5px', color: '#1e3a8a', lineHeight: '1.5' }}>
                                  {rawQ.Explanation}
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No question loaded</div>
                        )}
                      </div>

                      {/* Question Navigation Controls */}
                      <div className="bottom-navigation" style={{ marginTop: '16px' }}>
                        <button 
                          className="btn-nav"
                          disabled={reviewQuestionIndex === 0}
                          onClick={() => setReviewQuestionIndex(reviewQuestionIndex - 1)}
                        >
                          ← Previous Question
                        </button>
                        <button 
                          className="btn-nav"
                          disabled={reviewQuestionIndex === totalQuestionsCount - 1}
                          onClick={() => setReviewQuestionIndex(reviewQuestionIndex + 1)}
                        >
                          Next Question →
                        </button>
                      </div>

                      {/* Jump Grid Card */}
                      <div className="card" style={{ marginTop: '24px', padding: '20px' }}>
                        <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: '14px', fontWeight: 800, color: '#1a1d3b', marginBottom: '12px', textAlign: 'center' }}>
                          Jump to Question Number
                        </h3>
                        <div className="q-grid-container" style={{ gridTemplateColumns: 'repeat(5, 1fr)', maxWidth: '300px', margin: '0 auto' }}>
                          {filteredQuestions.map((_, idx) => {
                            const rawQ = filteredQuestions[idx];
                            const userAnswer = userAnswers[idx];
                            const correctAnswer = String(rawQ["Correct Answer"] || rawQ.correct || rawQ.correctAnswer || "").trim();
                            const isAnswered = userAnswer !== undefined && userAnswer !== null && userAnswer !== "";
                            const isCorrect = isAnswered && String(userAnswer).trim() === correctAnswer;

                            let customStyle = {
                              aspectRatio: '1',
                              borderRadius: '8px',
                              fontWeight: '800',
                              fontSize: '13px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifycontent: 'center',
                              transition: 'all 0.15s',
                              border: '1.5px solid #cbd5e1'
                            };

                            if (idx === reviewQuestionIndex) {
                              customStyle.border = '3px solid #3b82f6';
                              customStyle.transform = 'scale(1.1)';
                            }

                            if (!isAnswered) {
                              customStyle.background = '#f1f5f9';
                              customStyle.color = '#475569';
                              if (idx !== reviewQuestionIndex) customStyle.borderColor = '#cbd5e1';
                            } else if (isCorrect) {
                              customStyle.background = '#10b981';
                              customStyle.color = '#ffffff';
                              if (idx !== reviewQuestionIndex) customStyle.borderColor = '#059669';
                            } else {
                              customStyle.background = '#ef4444';
                              customStyle.color = '#ffffff';
                              if (idx !== reviewQuestionIndex) customStyle.borderColor = '#dc2626';
                            }

                            return (
                              <button
                                key={idx}
                                style={customStyle}
                                onClick={() => setReviewQuestionIndex(idx)}
                              >
                                {idx + 1}
                              </button>
                            );
                          })}
                        </div>
                        <div className="grid-legend" style={{ border: 'none', padding: 0, margin: '14px 0 0', justifyContent: 'center' }}>
                          <div className="legend-item"><span className="legend-dot" style={{ background: '#10b981' }} /> Correct</div>
                          <div className="legend-item"><span className="legend-dot" style={{ background: '#ef4444' }} /> Wrong</div>
                          <div className="legend-item"><span className="legend-dot" style={{ background: '#f1f5f9', border: '1px solid #cbd5e1' }} /> Skipped</div>
                        </div>
                      </div>

                      {/* Bottom Stats Summary Card */}
                      <div className="card" style={{ marginTop: '24px', padding: '24px' }}>
                        <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: '15px', fontWeight: 800, color: '#1a1d3b', marginBottom: '16px', textAlign: 'center' }}>
                          Attempt Statistics Summary
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center' }}>
                          <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '8px' }}>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: '#1d4ed8' }}>{totalQuestionsCount}</div>
                            <span style={{ fontSize: '10px', color: '#1e40af', fontWeight: 600, textTransform: 'uppercase' }}>Total</span>
                          </div>
                          <div style={{ background: '#ecfdf5', padding: '10px', borderRadius: '8px' }}>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: '#065f46' }}>{correctCount}</div>
                            <span style={{ fontSize: '10px', color: '#047857', fontWeight: 600, textTransform: 'uppercase' }}>Correct</span>
                          </div>
                          <div style={{ background: '#fef2f2', padding: '10px', borderRadius: '8px' }}>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: '#991b1b' }}>{wrongCount}</div>
                            <span style={{ fontSize: '10px', color: '#b91c1c', fontWeight: 600, textTransform: 'uppercase' }}>Wrong</span>
                          </div>
                          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: '#475569' }}>{skippedCount}</div>
                            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Skipped</span>
                          </div>
                          <div style={{ background: '#faf5ff', padding: '10px', borderRadius: '8px' }}>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: '#6d28d9' }}>{score}</div>
                            <span style={{ fontSize: '10px', color: '#7c3aed', fontWeight: 600, textTransform: 'uppercase' }}>Score</span>
                          </div>
                          <div style={{ background: '#fffbeb', padding: '10px', borderRadius: '8px' }}>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: '#b45309' }}>{percentageState}%</div>
                            <span style={{ fontSize: '10px', color: '#d97706', fontWeight: 600, textTransform: 'uppercase' }}>Percentage</span>
                          </div>
                        </div>
                      </div>

                      {/* Back and Return navigation buttons */}
                      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
                        <button 
                          className="btn-refresh" 
                          style={{ background: 'linear-gradient(135deg, #4b5563, #374151)', boxShadow: '0 4px 12px rgba(55,65,81,0.2)' }}
                          onClick={() => setView("result")}
                        >
                          ← Back to Result
                        </button>
                        <button 
                          className="btn-refresh"
                          style={{ background: 'linear-gradient(135deg, #1a1d3b, #4f3fa0)', boxShadow: '0 4px 12px rgba(26,29,59,0.2)' }}
                          onClick={resetForNewCandidate}
                        >
                          🏠 Return to Dashboard
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })()}
          </div>
        )}

        {/* ── DASHBOARD VIEW ── */}
        {view === "dashboard" && (
          <div className="dashboard-wrapper">
            <div className="dashboard-header">
              <div className="dashboard-header-left">
                <div className="branding-badge" style={{ marginBottom: "12px" }}>
                  <img src={oswalLogo} className="badge-logo" alt="OSWAL Logo" />
                  <span className="badge-text">Competitive Exam</span>
                </div>
                <h2>📊 Admin Dashboard</h2>
                <p>Candidate results & analytics — real-time data from Google Sheets</p>
              </div>
              <div className="dashboard-header-right">
                <button
                  className={`btn-refresh ${isRefreshing ? "spinning" : ""}`}
                  onClick={() => fetchDashboardData(false)}
                  title="Refresh Data"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10" />
                    <polyline points="1 20 1 14 7 14" />
                    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                  </svg>
                  {isRefreshing ? "Refreshing..." : "Refresh"}
                </button>
                <button
                  className="btn-logout"
                  onClick={resetForNewCandidate}
                  title="Logout"
                >
                  🚪 Logout
                </button>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="stat-grid">
              <div className="stat-card candidates-card">
                <div className="stat-icon total">👥</div>
                <div className="stat-info">
                  <div className="stat-num">{totalCandidatesCount}</div>
                  <div className="stat-label">Total Candidates</div>
                </div>
              </div>
              <div className="stat-card pass-card">
                <div className="stat-icon pass">✅</div>
                <div className="stat-info">
                  <div className="stat-num">{totalPassCount}</div>
                  <div className="stat-label">Total Pass</div>
                </div>
              </div>
              <div className="stat-card fail-card">
                <div className="stat-icon fail">❌</div>
                <div className="stat-info">
                  <div className="stat-num">{totalFailCount}</div>
                  <div className="stat-label">Total Fail</div>
                </div>
              </div>
              <div className="stat-card rate-card">
                <div className="stat-icon rate">📈</div>
                <div className="stat-info">
                  <div className="stat-num">{passRatePct}%</div>
                  <div className="stat-label">Pass Rate</div>
                </div>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="controls-bar">
              <div className="search-input-wrap">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search by name, subject or mobile number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="filter-group">
                <button
                  className={`filter-btn ${resultFilter === "ALL" ? "active-all" : ""}`}
                  onClick={() => setResultFilter("ALL")}
                >
                  All ({deDuplicatedRows.length})
                </button>
                <button
                  className={`filter-btn ${resultFilter === "PASS" ? "active-pass" : ""}`}
                  onClick={() => setResultFilter("PASS")}
                >
                  ✅ Pass ({deDuplicatedPassCount})
                </button>
                <button
                  className={`filter-btn ${resultFilter === "FAIL" ? "active-fail" : ""}`}
                  onClick={() => setResultFilter("FAIL")}
                >
                  ❌ Fail ({deDuplicatedFailCount})
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="table-wrap">
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Subject</th>
                      <th>Mobile Number</th>
                      <th>Score</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashLoading ? (
                      <tr className="loading-row">
                        <td colSpan="7">
                          <div className="dash-spinner" />
                          <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#6b7280" }}>
                            Loading candidates...
                          </div>
                        </td>
                      </tr>
                    ) : filteredDash.length === 0 ? (
                      <tr>
                        <td colSpan="7">
                          <div className="no-data">
                            <div className="no-data-icon">🗂️</div>
                            <p>No records found</p>
                            <span>
                              {searchQuery
                                ? "Try a different search term or clear filters."
                                : "No candidates have attempted the test yet."}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredDash.map((row, i) => {
                        const isPass = (row[4] || "").toUpperCase() === "PASS";
                        const candidateName = (row[0] || "").trim();
                        const candidateSubject = (row[1] || "").trim();
                        const candidateMobile = (row[2] || "").trim();
                        const candidateScore = (row[3] || "").trim();
                        const candidateDate = (row[5] || "").trim();

                        const formattedDateObj = formatDateTime(candidateDate);
                        const dateDisplay = formattedDateObj.timeStr ? (
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 600, color: '#1a1d3b' }}>{formattedDateObj.dateStr}</span>
                            <span style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>{formattedDateObj.timeStr}</span>
                          </div>
                        ) : (
                          <span style={{ fontWeight: 600, color: '#1a1d3b' }}>{formattedDateObj.dateStr}</span>
                        );

                        const cleanedMobile = candidateMobile.replace(/\D/g, "");
                        const isValidMobile = cleanedMobile.length >= 10 && cleanedMobile.length <= 15;
                        const waNumber = cleanedMobile.length === 10 ? `91${cleanedMobile}` : cleanedMobile;

                        let candidatePercentage = "0.0";
                        if (candidateScore && candidateScore.includes("/")) {
                          const [obtained, total] = candidateScore.split("/").map(Number);
                          if (total > 0) {
                            candidatePercentage = ((obtained / total) * 100).toFixed(1);
                          }
                        }

                        const messageText = `Hello ${candidateName},

Your Competitive Exam Result

Subject: ${candidateSubject}

Score: ${candidateScore}

Percentage: ${candidatePercentage}%

Result: ${isPass ? 'PASS' : 'FAIL'}

Keep practicing and best wishes!`;

                        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(messageText)}`;

                        return (
                          <tr key={i}>
                            <td className="td-name">{candidateName}</td>
                            <td className="td-email">{candidateSubject}</td>
                            <td className="td-mobile">{candidateMobile}</td>
                            <td className="td-mobile" style={{ fontWeight: 700 }}>{candidateScore}</td>
                            <td className="td-mobile">{dateDisplay}</td>
                            <td>
                              <span className={`result-badge ${isPass ? "pass" : "fail"}`}>
                                {isPass ? "✓ PASS" : "✗ FAIL"}
                              </span>
                            </td>
                            <td>
                              <div className="td-actions">
                                {isValidMobile ? (
                                  <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="action-btn wa-btn"
                                    title="Send WhatsApp Message"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                    </svg>
                                    <span>WhatsApp</span>
                                  </a>
                                ) : (
                                  <button
                                    disabled
                                    className="action-btn"
                                    title="Mobile number not available"
                                    style={{
                                      background: "#cbd5e1",
                                      color: "#64748b",
                                      boxShadow: "none",
                                      cursor: "not-allowed",
                                      opacity: 0.7,
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "6px"
                                    }}
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                    </svg>
                                    <span>WhatsApp</span>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {!dashLoading && filteredDash.length > 0 && (
                <div className="table-footer">
                  <span>
                    Showing <strong>{filteredDash.length}</strong> of <strong>{deDuplicatedRows.length}</strong> records
                  </span>
                  <span>
                    {(resultFilter !== "ALL" || searchQuery) && (
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: "#4f8ef7",
                          cursor: "pointer",
                          fontWeight: 600,
                          fontSize: "12px",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                        onClick={() => {
                          setResultFilter("ALL");
                          setSearchQuery("");
                        }}
                      >
                        × Clear filters
                      </button>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      )}
    </>
  );
}