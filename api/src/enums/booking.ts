export enum BookingStatuses {
  PENDING = 'pending',
  CREATED = 'created',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export enum BookingActivityType {
  CANCELLED = 'cancelled',
  RESCHEDULED = 'postponed',
  CHANGED_LOCATION = 'changed-location',
}
