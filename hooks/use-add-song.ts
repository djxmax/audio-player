import { useState } from "react"
import { useRouter } from "next/navigation"

export interface FormData {
  title: string;
  artist: string;
  album: string;
  url: string;
  coverUrl: string;
  duration: number;
}

export function useAddSong() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
      title: "",
      artist: "",
      album: "",
      url: "",
      coverUrl: "",
      duration: 0,
    });

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async (onSuccess?: () => void) => {
    if (!formData.url || !formData.coverUrl) {
      alert("Fichiers manquants !")
      return
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY ?? "";

    if(!apiUrl || !apiKey) {
    alert("Configuration manquante !")
    return
    }

    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/songs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setFormData({ title: "", artist: "", album: "", url: "", coverUrl: "", duration: 0 })
        router.refresh()
        if (onSuccess) onSuccess()
      }
    } catch (error) {
      console.error("Erreur save:", error)
    } finally {
      setLoading(false)
    }
  }

  return {
    formData,
    loading,
    updateField,
    handleSave
  }
}