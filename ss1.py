import json
import math
from sympy import symbols, Eq, solve

# Function to decode a value from a given base to decimal
def decode_value(base, value):
    return int(value, base)

# Function to perform Lagrange interpolation and find the constant term
def lagrange_interpolation(points):
    x = symbols('x')
    result = 0
    k = len(points)

    for i in range(k):
        xi, yi = points[i]
        term = yi
        for j in range(k):
            if i != j:
                xj, _ = points[j]
                term *= (x - xj) / (xi - xj)
        result += term

    # Evaluate at x=0 to get the constant term (c)
    constant_term = result.subs(x, 0)
    return constant_term

# Main function to read JSON input and calculate the constant term
def find_constant_term(file_path):
    # Read and parse JSON data
    with open(file_path, 'r') as file:
        data = json.load(file)

    n = data['keys']['n']
    k = data['keys']['k']

    # Decode the points
    points = []
    for i in range(1, n + 1):
        if str(i) in data:
            x = i
            base = int(data[str(i)]['base'])
            value = data[str(i)]['value']
            y = decode_value(base, value)
            points.append((x, y))

    # Select the first k points for interpolation
    selected_points = points[:k]

    # Calculate the constant term using Lagrange interpolation
    constant_term = lagrange_interpolation(selected_points)

    # Print the result
    print('Constant term (c):', constant_term)

# Call the function with the specified file path
find_constant_term(r'C:\\Users\\tvams\\OneDrive\\Desktop\\testcase1.json')
