import { toast } from 'react-hot-toast'

const Toaster = ({ error = false, update = false, remove = false, customMessage }) => {
  const message = customMessage

  if (error) {
    toast.error(message)
  } else if (update) {
    toast.success(message)
  } else if (remove) {
    toast.success(message)
  } else {
    toast.success(message)
  }

return null
}

export default Toaster