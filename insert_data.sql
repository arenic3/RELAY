# Insert the data into our tables


USE RELAY;

--INSERT INTO students (name, email, password)VALUES('Jonesy Ramirez', 'ramjon@gmail.com', 'fortnite'), ('Natalie Portman', 'pornat@gmail.com', 'password'), ('Nicole Orciel', 'orcnic@gmail.com', 'Hamliton$'), ('Shania Walgampaha', 'walsha@gmail.com', 'saku123'), ('Diggy Digster', 'digdig@gmail.com', 'pinco14') ;

--INSERT INTO staff (name, email, password)VALUES('Alain Henry', 'henala@gmail.com', 'MathsWiz'), ('Moses Xavier', 'xavmos@gmail.com', 'science=life'), ('Paxton Hall', 'halpax@gmail.com', 'SOHswim'), ('Llewelyn Fernandes', 'ferlle@gmail.com', 'dynamicWeb@pps') ; 

INSERT INTO users (name, email, password, role)VALUES('Jonesy Ramirez', 'ramjon@gmail.com', 'fortnite', 'student'), ('Natalie Portman', 'pornat@gmail.com', 'password', 'student'), ('Nicole Orciel', 'orcnic@gmail.com', 'Hamliton$', 'student'), ('Shania Walgampaha', 'walsha@gmail.com', 'saku123', 'student'), ('Diggy Digster', 'digdig@gmail.com', 'pinco14', 'student'), ('Alain Henry', 'henala@gmail.com', 'MathsWiz', 'staff'), ('Moses Xavier', 'xavmos@gmail.com', 'science=life', 'staff'), ('Paxton Hall', 'halpax@gmail.com', 'SOHswim', 'staff'), ('Llewelyn Fernandes', 'ferlle@gmail.com', 'dynamicWeb@pps', 'staff') ;
