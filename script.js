let equalPressed = 0;
let buttonInput = document.querySelectorAll(".button");
let input = document.getElementById("input");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");
let erase = document.getElementById("erase");

window.onload = () => {
  input.value = "";
};

buttonInput.forEach((buttonClass) => {
  buttonClass.addEventListener("click", () => {
    if (equalPressed === 1) {
      // input.value = "";
      equalPressed = 0;
    }
    input.value += buttonClass.value;
  });
});

equal.addEventListener("click", () => {
  equalPressed = 1;
  let inputValue = input.value;
  try {
    let solution = eval(inputValue);
    if (Number.isNaN(solution) || !Number.isFinite(solution)) {
      throw new Error("Invalid mathematical expression");
    }
    if (Number.isInteger(solution)) {
      input.value = solution;
    } else {
      input.value = solution.toFixed(2);
    }
  } catch (error) {
    alert(error.message);
  }
});
equal.addEventListener("click", () => {
  equalPressed = 1;
  let inputValue = input.value;
  console.log(inputValue, "hvyutfv");
  try {
    let solution = eval(inputValue);
    if (Number.isNaN(solution) || !Number.isFinite(solution)) {
      throw new Error("Invalid mathematical expression");
    }
    if (Number.isInteger(solution)) {
      input.value = solution;
    } else {
      input.value = solution.toFixed(2);
    }
  } catch (error) {
    alert(error.message);
  }
});

clear.addEventListener("click", () => {
  input.value = "";
});

erase.addEventListener("click", () => {
  input.value = input.value.substr(0, input.value.length - 1);
});

function generateMatrix() {

  // mengambiljumlah baris dan colom
  const rows = document.getElementById('rows').value;
  const columns = document.getElementById('columns').value;
  const matrixContainer = document.getElementById('matrixContainer');
  matrixContainer.innerHTML = '';
// membuat elemen input matrix
  for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
          const input = document.createElement('input');
          input.type = 'number';
          input.className = 'matrix-input';
          input.id = `matrix-${i}-${j}`;
          matrixContainer.appendChild(input);
      }
      matrixContainer.appendChild(document.createElement('br'));
  }

  document.getElementById('solveButton').style.display = 'block';
}
// mengumpulkan nilai matrix
function solveMatrix() {
  const rows = parseInt(document.getElementById('rows').value);
  const columns = parseInt(document.getElementById('columns').value);
  let matrix = [];

  for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < columns; j++) {
          const value = parseFloat(document.getElementById(`matrix-${i}-${j}`).value);
          row.push(value);
      }
      matrix.push(row);
  }

  // Gauss-Jordan elimination
  for (let i = 0; i < rows; i++) {
      // Make the diagonal contain all 1's
      let diag = matrix[i][i];
      for (let j = 0; j < columns; j++) {
          matrix[i][j] /= diag;
      }

      // Make the other columns contain 0's
      for (let k = 0; k < rows; k++) {
          if (k !== i) {
              let factor = matrix[k][i];
              for (let j = 0; j < columns; j++) {
                  matrix[k][j] -= factor * matrix[i][j];
              }
          }
      }
  }

  displaySolution(matrix);
}

function displaySolution(matrix) {
  // menghapus  isi sebelumnya
  const solutionContainer = document.getElementById('solutionContainer');
  solutionContainer.innerHTML = '';

  for (let i = 0; i < matrix.length; i++) {
      solutionContainer.innerHTML += 'x' + (i + 1) + ' = ' + matrix[i][matrix[i].length - 1] + '<br>';
  }
}
