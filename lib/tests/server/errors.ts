export class AttemptError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
  }
}
