-- Create Users table
CREATE TABLE IF NOT EXISTS Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('super admin', 'admin')) NOT NULL
);

-- Insert sample users
INSERT INTO Users (username, password, role) VALUES ('admin1', 'password123', 'admin');
INSERT INTO Users (username, password, role) VALUES ('superadmin1', 'password456', 'super admin');

-- Create Categories table
CREATE TABLE IF NOT EXISTS Categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- Insert sample categories
INSERT INTO Categories (name, type, user_id) VALUES ('Salary', 'income', 2);
INSERT INTO Categories (name, type, user_id) VALUES ('Food', 'expense', 1);

-- Create Incomes table
CREATE TABLE IF NOT EXISTS Incomes (
    income_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    amount REAL NOT NULL,
    currency TEXT NOT NULL,
    date TEXT NOT NULL,
    category_id INTEGER,
    user_id INTEGER,
    recurring BOOLEAN,
    start_date TEXT,
    end_date TEXT,
    FOREIGN KEY (category_id) REFERENCES Categories (category_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- Insert sample incomes
INSERT INTO Incomes (title, description, amount, currency, date, category_id, user_id, recurring, start_date, end_date)
VALUES ('Monthly Salary', 'Regular monthly salary payment', 2500, 'USD', '2025-02-01', 1, 2, 1, '2025-02-01', '2025-12-31');

-- Create Expenses table
CREATE TABLE IF NOT EXISTS Expenses (
    expense_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    amount REAL NOT NULL,
    currency TEXT NOT NULL,
    date TEXT NOT NULL,
    category_id INTEGER,
    user_id INTEGER,
    recurring BOOLEAN,'
    start_date TEXT,
    end_date TEXT,
    FOREIGN KEY (category_id) REFERENCES Categories (category_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- Insert sample expenses
INSERT INTO Expenses (title, description, amount, currency, date, category_id, user_id, recurring, start_date, end_date)
VALUES ('Grocery Shopping', 'Monthly grocery shopping', 150, 'USD', '2025-02-10', 2, 1, 0, NULL, NULL);

-- Create Profit Goals table
CREATE TABLE IF NOT EXISTS Profit_Goals (
    goal_id INTEGER PRIMARY KEY AUTOINCREMENT,
    target_amount REAL NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- Insert sample profit goals
INSERT INTO Profit_Goals (target_amount, start_date, end_date, user_id)
VALUES (10000, '2025-02-01', '2025-12-31', 2);
