"use client";

import React from "react";

// RHF
import { FormProvider, useForm } from "react-hook-form";

// Zod
import { zodResolver } from "@hookform/resolvers/zod";

// Schema
import { InvoiceSchema } from "@/lib/schemas";

// Context
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { TranslationProvider } from "@/contexts/TranslationContext";

// Types
import { InvoiceType } from "@/types;

// Variables
import { FORM_DEFAULT_VALUES } from "@/lib/variables";

type ProvidersProps = {
    children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
    const form = useForm<InvoiceType>({
        resolver: zodResolver(InvoiceSchema),
        defaultValues: FORM_DEFAULT_VALUES,
    });

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <TranslationProvider>
                <FormProvider {...form}>
                    {children}
                </FormProvider>
            </TranslationProvider>
        </ThemeProvider>
    );
};

export default Providers;
