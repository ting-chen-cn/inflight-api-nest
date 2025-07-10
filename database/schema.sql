PRAGMA foreign_keys = ON;

-- Booking table
CREATE TABLE Booking (
    bookingId TEXT PRIMARY KEY CHECK (length(bookingId) = 6)
);

-- Passenger table
CREATE TABLE Passenger (
    passengerId INTEGER PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    bookingId TEXT,
    FOREIGN KEY (bookingId) REFERENCES Booking(bookingId)
);

-- Flight table
CREATE TABLE Flight (
    flightNumber TEXT NOT NULL CHECK (flightNumber GLOB '[A-Z][A-Z][0-9][0-9][0-9]*'),
    departureAirport TEXT NOT NULL CHECK (departureAirport GLOB '[A-Z][A-Z][A-Z]'),
    arrivalAirport TEXT NOT NULL CHECK (arrivalAirport GLOB '[A-Z][A-Z][A-Z]'),
    departureDate TEXT NOT NULL CHECK (departureDate LIKE '____-__-__'),
    arrivalDate TEXT NOT NULL CHECK (arrivalDate LIKE '____-__-__'),
    PRIMARY KEY (flightNumber, departureDate)
);

-- BookingFlight join table
CREATE TABLE BookingFlight (
    bookingId TEXT NOT NULL,
    flightNumber TEXT NOT NULL,
    departureDate TEXT NOT NULL,
    PRIMARY KEY (bookingId, flightNumber, departureDate),
    FOREIGN KEY (bookingId) REFERENCES Booking(bookingId),
    FOREIGN KEY (flightNumber, departureDate) REFERENCES Flight(flightNumber, departureDate)
);

-- Sample data inserts

INSERT INTO Booking (bookingId) VALUES ('AB1234');
INSERT INTO Booking (bookingId) VALUES ('CD5678');

INSERT INTO Passenger (passengerId, firstName, lastName, email, bookingId) VALUES 
(1, 'Ting', 'Chen', 'ting.chen@example.com', 'AB1234'),
(2, 'Chris', 'Lee', 'chris.lee@example.com', 'AB1234'),
(3, 'Wen', 'Zhang', 'wen.zhang@example.com', 'CD5678');

INSERT INTO Flight (flightNumber, departureAirport, arrivalAirport, departureDate, arrivalDate) VALUES
('AY157', 'HEL', 'CDG', '2025-07-15', '2025-07-15'),
('AY158', 'CDG', 'HEL', '2025-07-20', '2025-07-20');

INSERT INTO BookingFlight (bookingId, flightNumber, departureDate) VALUES
('AB1234', 'AY157', '2025-07-15'),
('AB1234', 'AY158', '2025-07-20'),
('CD5678', 'AY158', '2025-07-20');