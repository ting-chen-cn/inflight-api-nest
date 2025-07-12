export class PassengerSummary {
  passengerId: string;
  firstName: string;
  lastName: string;
  bookingId: string;

  constructor(
    passengerId: string,
    firstName: string,
    lastName: string,
    bookingId: string,
  ) {
    this.passengerId = passengerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.bookingId = bookingId;
  }
}
