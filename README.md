# Expense Tracker API (Node.js + MongoDB)

## 📥 Clone & Setup

```bash
git clone https://github.com/your-username/expense-tracker-api.git
cd expense-tracker-api
npm install


# Development
npm run dev

# Production
npm run build
npm start


Auth Routes

POST /api/auth/register → Create pending user

POST /api/auth/verify → Verify user with OTP

POST /api/auth/login → Login user

POST /api/expenses → Create expense

GET /api/expenses → Get all expenses (supports ?search=&category= filters)

PATCH /api/expenses/:id → Update expense

DELETE /api/expenses/:id → Delete expense

GET /api/expenses/category-wise → Get category-wise expenses summary
```
