export function removeDuplicates(arr) {
    return arr.filter((valor, indice, self) => {
        return !self.slice(0, indice).some((otro) =>
        JSON.stringify(otro) === JSON.stringify(valor)
        );
    });
}