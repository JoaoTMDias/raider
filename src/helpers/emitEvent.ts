/**
 * Attaches data to a custom event.
 *
 * @example
 *
 * // Attach data to an event
 * emitEvent('a-custom-event-name', data);
 */
export const emitEvent = <GenericType>(eventName: string, data?: GenericType): void => {
  const event: CustomEvent<GenericType> = new CustomEvent(eventName, { detail: data });

  this.dispatchEvent(event);
}
