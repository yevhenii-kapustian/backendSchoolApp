export const slugify = (text: string) => {
    return text.trim()
            .replace(/[\s]+/gi, "-")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\-]/gi, "_")
            .toLowerCase()
}