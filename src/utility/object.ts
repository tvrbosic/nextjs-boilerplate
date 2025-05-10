// Helper function to parse FormData entry values
function parseValue(value: FormDataEntryValue): any {
  // If File or empty string: return as-is to avoid unwanted conversions (for example to 0 beacuse of Number(''))
  if (value instanceof File || value === '') return value;

  // Convert numeric values
  if (!isNaN(Number(value))) {
    return Number(value);
  }

  // Convert boolean values
  if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
    return value.toLowerCase() === 'true';
  }

  // Convert JSON-like arrays
  if (value.startsWith('[') && value.endsWith(']')) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  // Keep as string if no conversion applies
  return value;
}

export function formDataToObject<T extends Record<string, any>>(
  formData: FormData
): T {
  const obj: any = {};

  for (const [key, value] of formData.entries()) {
    if (!obj.hasOwnProperty(key)) {
      // Key does not exist: set value as-is
      obj[key] = value instanceof File ? value : parseValue(value);
    } else {
      // Key already exists: Convert existing value into an array or skip if already an array
      obj[key] = Array.isArray(obj[key]) ? obj[key] : [obj[key]];
      // Push new value into the array
      obj[key].push(value instanceof File ? value : parseValue(value));
    }
  }

  return obj as T;
}
