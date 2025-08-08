import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type OrderStatsCardProps = {
    title: string;
    value: string | number;
};

export default function OrderStatsCard({ title, value }: OrderStatsCardProps) {
    return (
        <Card className="relative shadow-none">
            <CardHeader>
                <CardDescription>{title}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {value}
                </CardTitle>
            </CardHeader>
        </Card>
    );
}
