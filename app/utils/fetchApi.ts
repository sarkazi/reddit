import toast from 'react-hot-toast'

export const fetchApi = (
  deleteText: string,
  successText: string,
  errorText: string,
  func: Promise<any>
) => {
  const notification = toast.loading(deleteText)
  try {
    func

    toast.success(successText, {
      id: notification,
    })
  } catch (err) {
    console.log(err)
    toast.error(errorText, {
      id: notification,
    })

    return err
  }
}
