export const localeDateString = (dateString?: string): string => {
    const date = dateString ? new Date(dateString) : new Date()
    
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}