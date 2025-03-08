-- Create Users table
CREATE TABLE IF NOT EXISTS Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE, -- Added email field
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('super_admin', 'admin', 'user')) NOT NULL
);

-- Insert sample users (PASSWORDS SHOULD BE HASHED IN THE APP, NOT HERE!)
INSERT INTO Users (username, email, password, role) VALUES ('admin1', 'admin1@example.com', 'password123', 'admin');
INSERT INTO Users (username, email, password, role) VALUES ('superadmin1', 'superadmin1@example.com', 'password456', 'super_admin');
INSERT INTO Users (username, email, password, role) VALUES ('user1', 'user1@example.com', 'password789', 'user');
INSERT INTO Users (username, email, password, role) VALUES ('user2', 'user2@example.com', 'password101', 'user');

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
INSERT INTO Categories (name, type, user_id) VALUES ('Rent', 'expense', 3);
INSERT INTO Categories (name, type, user_id) VALUES ('Freelance', 'income', 4);

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

INSERT INTO Incomes (title, description, amount, currency, date, category_id, user_id, recurring, start_date, end_date)
VALUES ('Freelance Project', 'Payment for freelance work', 1200, 'USD', '2025-02-15', 4, 4, 0, NULL, NULL);

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
    recurring BOOLEAN,
    start_date TEXT,
    end_date TEXT,
    FOREIGN KEY (category_id) REFERENCES Categories (category_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- Insert sample expenses
INSERT INTO Expenses (title, description, amount, currency, date, category_id, user_id, recurring, start_date, end_date)
VALUES ('Grocery Shopping', 'Monthly grocery shopping', 150, 'USD', '2025-02-10', 2, 1, 0, NULL, NULL);

INSERT INTO Expenses (title, description, amount, currency, date, category_id, user_id, recurring, start_date, end_date)
VALUES ('Rent Payment', 'Monthly rent payment', 800, 'USD', '2025-02-05', 3, 3, 1, '2025-02-05', '2025-12-05');

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

INSERT INTO Profit_Goals (target_amount, start_date, end_date, user_id)
VALUES (5000, '2025-02-01', '2025-12-31', 4);
