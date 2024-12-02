"use client";

import React from "react";

// ShadCn
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Components
import { BaseButton } from "@/app/components";

// Helpers
import { isValidEmail } from "@/lib/helpers";

// Zustand store
import { useInvoiceStore } from "@/store/invoiceStore";

type SendPdfToEmailModalProps = {
    sendPdfToMail: (email: string) => Promise<void>;
    children: React.ReactNode;
};

const SendPdfToEmailModal = ({
    sendPdfToMail,
    children,
}: SendPdfToEmailModalProps) => {
    const open = useInvoiceStore((state) => state.open);
    const setOpen = useInvoiceStore((state) => state.setOpen);
    const loading = useInvoiceStore((state) => state.loading);
    const setLoading = useInvoiceStore((state) => state.setLoading);
    const email = useInvoiceStore((state) => state.email);
    const setEmail = useInvoiceStore((state) => state.setEmail);
    const error = useInvoiceStore((state) => state.error);
    const setError = useInvoiceStore((state) => state.setError);
    const errorMessage = "Please enter a valid email address";

    const handleSendPdf = () => {
        setLoading(true);

        if (isValidEmail(email)) {
            sendPdfToMail(email).finally(() => {
                setError("");
                setLoading(false);
                setEmail("");
                setOpen(false);
            });
        } else {
            setLoading(false);
            setError(errorMessage);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Send to email</DialogTitle>
                    <DialogDescription>
                        Please specify the email address for invoice delivery.
                    </DialogDescription>
                </DialogHeader>
                <Label>Email</Label>
                <Input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Input>

                {!loading && error && (
                    <small style={{ color: "red" }}>{error}</small>
                )}

                <BaseButton
                    tooltipLabel="Send invoice PDF"
                    loading={loading}
                    loadingText="Sending email"
                    onClick={handleSendPdf}
                >
                    Send PDF
                </BaseButton>
            </DialogContent>
        </Dialog>
    );
};

export default SendPdfToEmailModal;
