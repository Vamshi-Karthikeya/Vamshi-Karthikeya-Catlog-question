const fs = require('fs');

// Function to read and parse JSON data from file
function readJsonFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

// Function to decode y values based on their bases and return as (x, y) points
function decodeYValues(data) {
    const points = [];
    for (const key in data) {
        if (key === "keys") continue;  // Skip "keys" object
        const x = parseInt(key);  // Convert x (key) to integer
        const base = parseInt(data[key].base);  // Get base for y value
        const y = parseInt(data[key].value, base);  // Decode y using the specified base
        points.push([x, y]);
    }
    return points;
}

// Function to perform Lagrange interpolation for constant term calculation
function lagrangeInterpolation(points, degree) {
    let constantTerm = 0;

    for (let i = 0; i <= degree; i++) {
        let [xi, yi] = points[i];
        let termNumerator = yi;
        let termDenominator = 1;

        for (let j = 0; j <= degree; j++) {
            if (i !== j) {
                const [xj, _] = points[j];
                termNumerator *= -xj;
                termDenominator *= (xi - xj);
            }
        }

        constantTerm += termNumerator / termDenominator;
    }

    return Math.round(constantTerm);
}

function main() {
    const filePaths = [
        'C:\\Users\\tvams\\OneDrive\\Desktop\\testcase1.json',
        'C:\\Users\\tvams\\OneDrive\\Desktop\\testcase2.json'
    ];

    filePaths.forEach((filePath, index) => {
        const data = readJsonFile(filePath);
        const { n, k } = data.keys;
        const degree = k - 1;

        // Decode points and calculate constant term
        const points = decodeYValues(data);
        const constantTerm = lagrangeInterpolation(points, degree);
        
        console.log(`Secret for testcase ${index + 1}: ${constantTerm}`);
    });
}

// Run the main function
main();
