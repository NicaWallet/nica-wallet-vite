import i18n from "../i18n";

export class DateTimeUtils {
    // Formatear una fecha en un formato específico
    /**
     * Formats a given date according to the specified format string.
     * 
     * The format string can include the following placeholders:
     * - `dd`: Day of the month, 2 digits with leading zeros (01 to 31)
     * - `mm`: Month, 2 digits with leading zeros (01 to 12)
     * - `yyyy`: Year, 4 digits
     * - `hh`: Hours, 2 digits with leading zeros (00 to 23)
     * - `MM`: Minutes, 2 digits with leading zeros (00 to 59)
     * - `ss`: Seconds, 2 digits with leading zeros (00 to 59)
     * 
     * @param date - The date object to format.
     * @param format - The format string.
     * @returns The formatted date string.
     */
    static formatDate(date: Date, format: string): string {
        const map: { [key: string]: string } = {
            dd: date.getDate().toString().padStart(2, '0'),
            mm: (date.getMonth() + 1).toString().padStart(2, '0'),
            yyyy: date.getFullYear().toString(),
            hh: date.getHours().toString().padStart(2, '0'),
            MM: date.getMinutes().toString().padStart(2, '0'),
            ss: date.getSeconds().toString().padStart(2, '0'),
        };

        return format.replace(/dd|mm|yyyy|hh|MM|ss/gi, matched => map[matched]);
    }

    // Obtener la fecha y hora actual
    /**
     * Returns the current date and time in ISO 8601 format.
     *
     * @returns {string} The current date and time as an ISO 8601 string.
     */
    static getCurrentDateTime(): string {
        return new Date().toISOString();
    }

    // Convertir una fecha a un formato ISO
    /**
     * Converts a given Date object to an ISO 8601 date string (YYYY-MM-DD).
     *
     * @param date - The Date object to be converted.
     * @returns The ISO 8601 date string representation of the given date.
     */
    static toISODate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    // Agregar días a una fecha
    /**
     * Adds a specified number of days to a given date.
     *
     * @param date - The initial date to which days will be added.
     * @param days - The number of days to add to the date.
     * @returns A new `Date` object with the specified number of days added.
     */
    static addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    // Restar días a una fecha
    /**
     * Subtracts a specified number of days from a given date.
     *
     * @param date - The original date from which days will be subtracted.
     * @param days - The number of days to subtract from the date.
     * @returns A new Date object representing the date after subtracting the specified number of days.
     */
    static subtractDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() - days);
        return result;
    }

    // Comparar dos fechas (sin considerar la hora)
    /**
     * Compares two dates by year, month, and day.
     * 
     * @param date1 - The first date to compare.
     * @param date2 - The second date to compare.
     * @returns A negative number if `date1` is earlier than `date2`, 
     *          zero if they are the same date, 
     *          or a positive number if `date1` is later than `date2`.
     */
    static compareDates(date1: Date, date2: Date): number {
        const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
        return d1.getTime() - d2.getTime();
    }

    // Verificar si una fecha es válida
    /**
     * Checks if the provided date string is a valid date.
     *
     * @param date - The date string to validate.
     * @returns `true` if the date string is a valid date, otherwise `false`.
     */
    static isValidDate(date: string): boolean {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
    }

    // Formatear fecha en un formato más legible, como "15 de octubre de 2024 a las 3:45 PM"
    static formatHumanReadable(date: Date, includeTime = false, locale?: string): string {
        const language = locale || i18n.language || 'en-US';
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };

        if (includeTime) {
            options.hour = 'numeric';
            options.minute = '2-digit';
            options.hour12 = true;
        }

        return new Intl.DateTimeFormat(language, options).format(date);
    }
}

/**
 * Formats a given Date object into a string with the format "DD-MM-YYYY".
 *
 * @param date - The Date object to format.
 * @returns A string representing the formatted date.
 */
export const formatDate = (date: Date): string => {
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
};

/**
 * Formats a given Date object into a 12-hour time string with AM/PM notation.
 *
 * @param date - The Date object to format.
 * @returns A string representing the formatted time in the format "hh:mm AM/PM".
 */
export const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // La hora '0' debe ser '12'
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
};



