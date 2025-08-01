import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ConfirmDeleteDialogProps = {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmLabel?: string;
};

export default function ConfirmDeleteDialog({
    open,
    onCancel,
    onConfirm,
    title = "Are you absolutely sure?",
    description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    confirmLabel = "Confirm",
}: ConfirmDeleteDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onCancel}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-red-600"
                    >
                        {confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
