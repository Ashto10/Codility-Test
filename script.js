const questions = [
  {
    text: `typo?`,
    tests: [
      {
        input: [-1, -2, 1, 2],
        expected: -2,
      },
      {
        input: [-1, -2, -4, 2],
        expected: -4,
      },
    ],
    solution: solution1,
  },
  {
    text: `Format AABBB`,
    tests: [
      {
        input: "BAAABAB",
        expected: 2,
      },
      {
        input: "BBABAA",
        expected: 3,
      },
      {
        input: "AABBBB",
        expected: 0,
      },
    ],
    solution: solution2,
  },
  {
    text: `Return largest number when adding 5`,
    tests: [
      {
        input: 268,
        expected: 5268,
      },
      {
        input: 670,
        expected: 6750,
      },
      {
        input: 0,
        expected: 50,
      },
      {
        input: -999,
        expected: -5999,
      },
    ],
    solution: solution3,
  },
];

const _create = (element, options = []) => {
  const el = document.createElement(element.toUpperCase());

  Object.keys(options).forEach((key) => {
    el[key] = options[key];
  });

  return el;
};

const main = document.getElementById("App");

questions.forEach((question) => {
  const container = _create("div", {
    className: "question-wrapper",
  });
  const questionText = _create("p", { innerText: question.text });

  const testWrapper = _create("div");

  question.tests.forEach((test) => {
    const testContainer = _create("div", { className: "test-container" });
    const testIn = _create("div", {
      className: "test-in",
      innerText: JSON.stringify(test.input),
    });

    const testOut = _create("div", { className: "test-out" });
    try {
      const solution = question.solution(test.input);
      if (solution === test.expected) {
        testOut.innerText = JSON.stringify(solution);
        testOut.classList.add("correct");
      } else {
        testOut.innerText = `Got ${JSON.stringify(solution)}, expected ${
          test.expected
        }`;
      }
    } catch (error) {
      testOut.innerText = error;
    }

    testContainer.append(testIn);
    testContainer.append(testOut);
    testWrapper.append(testContainer);
  });

  container.append(questionText);
  container.append(testWrapper);
  main.append(container);
});

function solution1(A) {
  var ans = 0;
  for (i = 0; i < A.length; i++) {
    if (ans > A[i]) {
      ans = A[i];
    }
  }
  return ans;
}

function solution2(S) {
  let B = 0;
  let del = 0;

  for (let i = 0; i < S.length; i++) {
    if ("A" === S[i]) del = Math.min(B, del + 1);
    else B++;
  }
  return del;
}

function solution3(N) {
  if (N < 0) return Number("-5" + Math.abs(N));
  else {
    const digits = ("" + N).split("");
    for (let i = 0; i < digits.length; i++) {
      if (Number(digits[i]) < 5) {
        digits.splice(i, 0, "5");
        return Number(digits.join(""));
      }
    }
  }
}
