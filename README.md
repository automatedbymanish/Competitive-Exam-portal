# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

## 📝 LaTeX Formatting Guide for Google Sheets

The Competitive Exam Portal supports LaTeX syntax for rendering professional mathematical equations and scientific formulas. Use standard Markdown delimiters:
- **Inline Math**: wrap equations in single dollar signs `$ ... $` (renders within a sentence).
- **Display Math**: wrap equations in double dollar signs `$$ ... $$` (renders centered on a new line).

### Copy-Pasteable Sample Questions (Google Sheets Format)

You can copy and paste the following rows directly into your Google Sheets (`Question` and `Question Hindi` tabs):

| ID | Subject Name | Question | Option A | Option B | Option C | Option D | Correct Answer | Marks | Pass Marks | Explanation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **2001** | Mathematics | What is the value of $x$ in the quadratic equation $x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$ when $a=1$, $b=-3$, and $c=2$? | $x = 1$ or $x = 2$ | $x = -1$ or $x = -2$ | $x = 3$ or $x = 2$ | $x = 0$ | **A** | 1 | 7 | The equation resolves to $x=\frac{-(-3)\pm\sqrt{(-3)^2-4(1)(2)}}{2(1)} = \frac{3\pm\sqrt{9-8}}{2} = \frac{3\pm 1}{2}$. Thus, $x = 2$ or $x = 1$. |
| **2002** | Mathematics | Evaluate the definite integral: $$ \int_0^1 x^2 \, dx $$ | $\frac{1}{3}$ | $\frac{1}{2}$ | $1$ | $\frac{2}{3}$ | **A** | 1 | 7 | The anti-derivative of $x^2$ is $\frac{x^3}{3}$. Evaluating from $0$ to $1$ gives: $$ \left[ \frac{x^3}{3} \right]_0^1 = \frac{1^3}{3} - \frac{0^3}{3} = \frac{1}{3} $$. |
| **2003** | Mathematics | What is the sum of the squares of the first $n$ natural numbers represented by $$ \sum_{i=1}^{n} i^2 $$? | $\frac{n(n+1)(2n+1)}{6}$ | $\frac{n(n+1)}{2}$ | $n^2$ | $\frac{n(n+1)(2n+1)}{2}$ | **A** | 1 | 7 | The standard formula for the sum of squares is $$ \sum_{i=1}^{n} i^2 = \frac{n(n+1)(2n+1)}{6} $$. |
| **2004** | General Science | Which acid is represented by the chemical formula $H_2SO_4$? | Hydrochloric Acid | Nitric Acid | Sulfuric Acid | Carbonic Acid | **C** | 1 | 7 | $H_2SO_4$ consists of 2 Hydrogen atoms, 1 Sulfur atom, and 4 Oxygen atoms, representing **Sulfuric Acid**. |
| **2005** | General Science | When carbon dioxide ($CO_2$) reacts with water ($H_2O$), which weak acid is formed? | $H_2SO_4$ | $HNO_3$ | $H_2CO_3$ | $HCl$ | **C** | 1 | 7 | The reaction is represented by: $CO_2 + H_2O \rightarrow H_2CO_3$ (Carbonic Acid). |
| **2006** | Mathematics | Solve the matrix addition: $$ \begin{bmatrix}1&2\\3&4\end{bmatrix} + \begin{bmatrix}5&6\\7&8\end{bmatrix} $$ | $$ \begin{bmatrix}6&8\\10&12\end{bmatrix} $$ | $$ \begin{bmatrix}5&12\\21&32\end{bmatrix} $$ | $$ \begin{bmatrix}4&4\\4&4\end{bmatrix} $$ | $$ \begin{bmatrix}1&1\\1&1\end{bmatrix} $$ | **A** | 1 | 7 | Adding corresponding elements: $1+5=6$, $2+6=8$, $3+7=10$, $4+8=12$. |

### Common LaTeX Cheatsheet for Sheet Authors

- **Fractions**: `$\frac{numerator}{denominator}$` (e.g. `$\frac{2x+3}{x-1}$`)
- **Square Root**: `$\sqrt{expression}$` (e.g. `$\sqrt{x^2+y^2}$`)
- **Cube Root**: `$\sqrt[3]{expression}$` (e.g. `$\sqrt[3]{8} = 2$`)
- **Superscripts (Powers)**: `x^2` (e.g. `$x^2$`)
- **Subscripts**: `H_2` (e.g. `$H_2$`)
- **Integration**: `$\int_a^b expression \, dx$` (e.g. `$\int_0^1 x^2 \, dx$`)
- **Summation (Sigma)**: `$\sum_{i=1}^{n} expression$` (e.g. `$\sum_{i=1}^{n} i$`)
- **Greek symbols**: `$\alpha$`, `$\beta$`, `$\theta$`, `$\pi$`, `$\lambda$`
- **Matrices**: `$$ \begin{bmatrix} a & b \\ c & d \end{bmatrix} $$`

