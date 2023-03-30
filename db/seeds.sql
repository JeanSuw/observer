INSERT INTO department (department_name)
VALUES ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO role(title,salary,department_id)
VALUES  ('Sales manager', 95000, 1),
        ('SW Engineer', 108781, 2),
        ('Accountant', 90000, 3),
        ('Lawyer', 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Lenora', 'Fitzpatrick', 3, NULL),
        ('Leroy', 'Davenport', 3, '1'),
        ('Jan', 'Black', 2, NULL),
        ('Laurie', 'Clarke', 1, '5'),
        ('Mamie', 'Pearson', 4, NULL);
