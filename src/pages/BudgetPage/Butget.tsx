import { useState, useEffect } from "react";

export const useMockBudgets = () => {
    const [budgets, setBudgets] = useState<{ 
      budget_id: number; 
      amount: number; 
      start_date: string; 
      end_date: string; 
      category: string;
    }[]>([]);
  
    useEffect(() => {
      const mockData = [
        {
          budget_id: 1,
          amount: 1000,
          start_date: "2024-01-01",
          end_date: "2024-06-01",
          category: "Food",
        },
        {
          budget_id: 2,
          amount: 2000,
          start_date: "2024-02-01",
          end_date: "2024-07-01",
          category: "Rent",
        },
        {
          budget_id: 3,
          amount: 1500,
          start_date: "2024-03-01",
          end_date: "2024-08-01",
          category: "Utilities",
        },
        {
          budget_id: 4,
          amount: 1200,
          start_date: "2024-04-01",
          end_date: "2024-09-01",
          category: "Transportation",
        },
        {
          budget_id: 5,
          amount: 800,
          start_date: "2024-05-01",
          end_date: "2024-10-01",
          category: "Entertainment",
        },
        {
          budget_id: 6,
          amount: 500,
          start_date: "2024-06-01",
          end_date: "2024-11-01",
          category: "Healthcare",
        },
        {
          budget_id: 7,
          amount: 300,
          start_date: "2024-07-01",
          end_date: "2024-12-01",
          category: "Education",
        },
        {
          budget_id: 8,
          amount: 2500,
          start_date: "2024-08-01",
          end_date: "2025-01-01",
          category: "Savings",
        },
        {
          budget_id: 9,
          amount: 700,
          start_date: "2024-09-01",
          end_date: "2025-02-01",
          category: "Insurance",
        },
        {
          budget_id: 10,
          amount: 900,
          start_date: "2024-10-01",
          end_date: "2025-03-01",
          category: "Travel",
        },
        {
          budget_id: 11,
          amount: 1100,
          start_date: "2024-11-01",
          end_date: "2025-04-01",
          category: "Groceries",
        },
        {
          budget_id: 12,
          amount: 1300,
          start_date: "2024-12-01",
          end_date: "2025-05-01",
          category: "Dining Out",
        },
        {
          budget_id: 13,
          amount: 1400,
          start_date: "2025-01-01",
          end_date: "2025-06-01",
          category: "Clothing",
        },
        {
          budget_id: 14,
          amount: 1600,
          start_date: "2025-02-01",
          end_date: "2025-07-01",
          category: "Gifts",
        },
        {
          budget_id: 15,
          amount: 1700,
          start_date: "2025-03-01",
          end_date: "2025-08-01",
          category: "Subscriptions",
        },
        {
          budget_id: 16,
          amount: 1800,
          start_date: "2025-04-01",
          end_date: "2025-09-01",
          category: "Pets",
        },
        {
          budget_id: 17,
          amount: 1900,
          start_date: "2025-05-01",
          end_date: "2025-10-01",
          category: "Personal Care",
        },
        {
          budget_id: 18,
          amount: 2100,
          start_date: "2025-06-01",
          end_date: "2025-11-01",
          category: "Miscellaneous",
        },
        {
          budget_id: 19,
          amount: 2200,
          start_date: "2025-07-01",
          end_date: "2025-12-01",
          category: "Home Improvement",
        },
        {
          budget_id: 20,
          amount: 2300,
          start_date: "2025-08-01",
          end_date: "2026-01-01",
          category: "Electronics",
        },
        {
          budget_id: 21,
          amount: 2400,
          start_date: "2025-09-01",
          end_date: "2026-02-01",
          category: "Hobbies",
        },
        {
          budget_id: 22,
          amount: 2600,
          start_date: "2025-10-01",
          end_date: "2026-03-01",
          category: "Fitness",
        },
        {
          budget_id: 23,
          amount: 2700,
          start_date: "2025-11-01",
          end_date: "2026-04-01",
          category: "Charity",
        },
        {
          budget_id: 24,
          amount: 2800,
          start_date: "2025-12-01",
          end_date: "2026-05-01",
          category: "Investments",
        },
        {
          budget_id: 25,
          amount: 2900,
          start_date: "2026-01-01",
          end_date: "2026-06-01",
          category: "Taxes",
        },
        {
          budget_id: 26,
          amount: 3000,
          start_date: "2026-02-01",
          end_date: "2026-07-01",
          category: "Loans",
        },
        {
          budget_id: 27,
          amount: 3100,
          start_date: "2026-03-01",
          end_date: "2026-08-01",
          category: "Mortgage",
        },
        {
          budget_id: 28,
          amount: 3200,
          start_date: "2026-04-01",
          end_date: "2026-09-01",
          category: "Childcare",
        },
        {
          budget_id: 29,
          amount: 3300,
          start_date: "2026-05-01",
          end_date: "2026-10-01",
          category: "Tuition",
        },
        {
          budget_id: 30,
          amount: 3400,
          start_date: "2026-06-01",
          end_date: "2026-11-01",
          category: "Savings",
        }
        // Agrega más datos de prueba según sea necesario
      ];
  
      setBudgets(mockData);
    }, []);
  
    return budgets;
  };