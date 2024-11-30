export const formDataToJson = (formData) => {
	return Object.fromEntries(
		Array.from(formData.keys()).map((key) => [
			key.includes("[]") ? key.slice(0, -2) : key,
			formData.getAll(key).length > 1 ? formData.getAll(key) : formData.get(key),
		])
	);
};
