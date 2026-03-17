// services/aiService.js
exports.generateInsights = (expenses) => {
  let total = 0;
  let categoryMap = {};

  expenses.forEach(e => {
    total += e.amount;
    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + e.amount;
  });

  let insights = [];

  for (let cat in categoryMap) {
    let percent = ((categoryMap[cat] / total) * 100).toFixed(1);
    insights.push(`${cat} takes ${percent}% of your spending`);
  }

  // Extra smart insight
  if (categoryMap["Food"] > total * 0.4) {
    insights.push("You are spending too much on food 🍔");
  }

  return insights;
};