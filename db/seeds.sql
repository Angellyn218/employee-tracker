-- Insert test values

INSERT INTO departments (name)
VALUES ("Marketing"),
       ("Human Resources (HR)"),
       ("Finance"),
       ("Operations"),
       ("IT");

INSERT INTO roles (title, salary, department_id)
VALUES ("Marketing Manager", 90000, 1),
       ("SEO Specialist", 50000, 1),
       ("HR Assistant", 41000, 2),
       ("Investment Analyst", 73000, 3),
       ("Operations coordinator", 71000, 4),
       ("Systems Analyst", 109000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Saget", 1, NULL),
       ("Jodie", "Sweetin", 2, 1),
       ("Queen Elizabeth", "of England", 3, NULL),
       ("John", "Doe", 5, NULL);