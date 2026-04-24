export const generateTimeSlots = (startHour: number, endHour: number): string[] => {
    const slots: string[] = [];
    for (let hour = startHour; hour <= endHour; hour++) {
        const normalizedHour = hour % 24;
        const period = normalizedHour >= 12 ? 'PM' : 'AM';
        const displayHour = normalizedHour > 12 ? normalizedHour - 12 : normalizedHour === 0 ? 12 : normalizedHour;

        slots.push(`${displayHour}:00 ${period}`);
        slots.push(`${displayHour}:30`);
    }
    return slots;
};
