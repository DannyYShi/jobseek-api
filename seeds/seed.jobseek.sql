INSERT INTO lists
    (list_name)
VALUES
    ('Wishlist'),
    ('Applied'),
    ('Interview'),
    ('Offer'),
    ('Rejected');


INSERT INTO cards
    (list_id, company_name, position_applied, job_location, job_url, job_description)
VALUES
    (1, 'Apple', 'Genius', 'Cupertino', 'www.apple.com/careers', 'This is an example'),
    (1, 'Uber', 'Driver', 'San Francisco', 'www.uber.com/careers', 'This is another example'),
    (2, 'Google', 'Googler', 'Atlanta', 'www.google.com/careers', 'This is an example in another list');



