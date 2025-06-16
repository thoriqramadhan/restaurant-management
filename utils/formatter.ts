export function objectToFormData(obj: { [key: string]: string }) {
    const formData = new FormData();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }
    return formData;
  }
  
export function FormatToIDR(number:number){
  return new Intl.NumberFormat('id-ID' , {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits:0
  }).format(number)
}