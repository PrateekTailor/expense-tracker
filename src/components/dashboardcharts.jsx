import Chart from "react-apexcharts";

// Category-wise expense chart
export const CategoryBreakup = ({ items = [] }) => {

  const categoryTotals = {};

  items.forEach((item) => {
    if (item.Type === "expense") {
      const category = item.Category || "Other";

      categoryTotals[category] =
        (categoryTotals[category] || 0) + Number(item.Amount || 0);
    }
  });

  const labels = Object.keys(categoryTotals);
  const chartSeries = Object.values(categoryTotals);

  const chartOptions = {
    labels,
    colors: ["#FF6B35", "#FFB627", "#FF3838", "#00E396", "#775DD0"],
    theme: { mode: "dark" },
    chart: { background: "transparent" },
    legend: { position: "bottom" },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Spent",
              formatter: (w) => {
                const total = w.globals.seriesTotals.reduce(
                  (a, b) => a + b,
                  0
                );
                return `₹${total.toLocaleString("en-IN")}`;
              },
            },
          },
        },
      },
    },
  };

  return (
    <div style={{
      background: "#171717",
      padding: "20px",
      borderRadius: "12px",
      flex: 1,
      minWidth: "350px"
    }}>
      <h3 style={{ color: "#fff", marginBottom: "15px" }}>
        Category Breakup
      </h3>

      {chartSeries.length > 0 ? (
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="donut"
          width="100%"
        />
      ) : (
        <p style={{ color: "#aaa" }}>
          Add expense transactions to view category breakdown.
        </p>
      )}
    </div>
  );
};


// Monthly income and expense chart
export const MonthlyOverview = ({ items = [] }) => {

  const currentDate = new Date();

  const months = Array.from({ length: 6 }, (_, index) => {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 5 + index,
      1
    );
  });

  const monthKeys = months.map((date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
  );

  const incomeData = Array(6).fill(0);
  const expenseData = Array(6).fill(0);

  items.forEach((item) => {
    if (!item.Date) return;

    const date = new Date(`${item.Date}T00:00:00`);

    if (Number.isNaN(date.getTime())) return;

    const key = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    const index = monthKeys.indexOf(key);

    if (index === -1) return;

    const amount = Number(item.Amount || 0);

    if (item.Type === "income") {
      incomeData[index] += amount;
    } else if (item.Type === "expense") {
      expenseData[index] += amount;
    }
  });

  const chartOptions = {
    theme: { mode: "dark" },
    chart: {
      background: "transparent",
      toolbar: { show: false },
    },
    colors: ["#00E396", "#FF6B35"],
    xaxis: {
      categories: months.map((date) =>
        date.toLocaleString("en-IN", { month: "short" })
      ),
    },
    yaxis: {
      labels: {
        formatter: (value) =>
          `₹${Math.round(value).toLocaleString("en-IN")}`,
      },
    },
    grid: { borderColor: "#333" },
    legend: { position: "bottom" },
    dataLabels: { enabled: false },
  };

  const chartSeries = [
    { name: "Income", data: incomeData },
    { name: "Expenses", data: expenseData },
  ];

  return (
    <div style={{
      background: "#171717",
      padding: "20px",
      borderRadius: "12px",
      flex: 2,
      minWidth: "300px"
    }}>
      <h3 style={{ color: "#fff", marginBottom: "15px" }}>
        Monthly Overview
      </h3>

      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={280}
      />
    </div>
  );
};