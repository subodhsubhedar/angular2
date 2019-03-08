
export class Utils {

    constructor() { }


    public static addItem(inputElem: any, itemArray: any[]): void {

        if (itemArray) {
            if (inputElem) {
                itemArray.push(inputElem);
            } else {
                alert('Please provide an input.');
            }
        }
    }


    public static removeItemByIndex(indx: number, itemArray: any[]): void {

        if (itemArray) {
            var val = confirm("Are you sure you want to remove \" " + itemArray[indx] + " \" ?")
            if (val) {
                itemArray.splice(indx, 1);
            }
        }
    }
}