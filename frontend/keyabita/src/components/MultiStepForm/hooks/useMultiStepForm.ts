import { useState } from "react";
import type { FormData, FormErrors } from "../types";
import { validateStep, totalSteps } from "../validation";

const initialFormData: FormData = {
    propertyType: null,
    cap: "",
    condition: "",
    metratura: "",
    stanze: 0,
    piano: 0,
    bagni: 0,
    ascensore: false,
    parcheggio: false,
    garage: false,
    giardino: false,
    balconi: false,
    nome: "",
    cognome: "",
    email: "",
    numeroDiTelefono: "",
    statoImmobileId: 1,
    privacy: false,
};

export default function useMultiStepForm() {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>({});

    const nextStep = () => setCurrentStep((s) => Math.min(s + 1, totalSteps));
    const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

    const goToStep = (step: number) => {
        if (step >= 1 && step <= totalSteps) setCurrentStep(step);
    };

    const setField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleCounterChange = (field: "stanze" | "piano" | "bagni", type: "increment" | "decrement") => {
        setFormData((prev) => {
            const currentValue = prev[field];
            let newValue = currentValue;

            if (type === "increment") newValue = (currentValue as number) + 1;
            else if (type === "decrement" && (currentValue as number) > 0) newValue = (currentValue as number) - 1;
            const updated = { ...prev, [field]: newValue } as FormData;
            if (field === "stanze" && newValue > 0) {
                setErrors((prevErr) => ({ ...prevErr, stanze: undefined }));
            }
            return updated;
        });
    };

    const handleToggle = (field: "ascensore" | "parcheggio" | "garage" | "giardino" | "balconi", value: boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const validateCurrentStep = (): boolean => {
        const newErrors = validateStep(currentStep, formData);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        console.log("Form submitted with data:", JSON.stringify(formData, null, 2));

        const {
            nome,
            cognome,
            email,
            numeroDiTelefono,
            stanze,
            bagni,
            statoImmobileId,
            ...datiImmobile
        } = formData;

        try {
            const immobilePayload = {
                ...datiImmobile,
                numeroStanze: stanze,
                numeroBagni: bagni,
                statoImmobile: statoImmobileId,
            };

            const immobileResponse = await fetch("http://localhost:8080/api/invio-richiesta", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(immobilePayload),
            });

            if (!immobileResponse.ok) throw new Error("Errore creazione immobile");

            const immobile = await immobileResponse.json();

            const valutazionePayload = {
                id_immobiliare: immobile.id,
                nome,
                cognome,
                email,
                numeroDiTelefono,
            };

            const valutazioneResponse = await fetch("http://localhost:8080/api/valutazioni", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(valutazionePayload),
            });

            if (!valutazioneResponse.ok) throw new Error("Errore creazione valutazione");

            nextStep();
            console.log("Valutazione inviata con successo!");
        } catch (err) {
            console.error(err);
        }
    };

    return {
        currentStep,
        totalSteps,
        formData,
        errors,
        setField,
        handleCounterChange,
        handleToggle,
        nextStep,
        prevStep,
        goToStep,
        validateCurrentStep,
        handleSubmit,
    } as const;
}
