'use client';

import { useMemo } from "react";
import { Heart, X, Globe } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "../ui/drawer";
import { Button } from "../ui/button";
import { useDeleteAllFavoritePlansMutation, useDeleteFavoritePlanMutation, useMyFavoritePlansQuery } from "@/hooks/usePlans";
import { FavoritePlan } from "@/types";
import { DeleteFavoritePlanDialog } from "./DeleteFavoritePlanDialog";


interface FavoritesDrawerProps {
    userId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const FavoritesDrawer = ({ open, onOpenChange, userId }: FavoritesDrawerProps) => {
    const router = useRouter();

    const { data } = useMyFavoritePlansQuery(userId);
    const { mutate: deleteFavoritePlan, isPending: isDeletingFavoritePlan } = useDeleteFavoritePlanMutation(userId);
    const { mutate: deleteAllFavoritePlans, isPending: isDeletingAllFavoritePlans } = useDeleteAllFavoritePlansMutation(userId);

    const favoritesData = useMemo<FavoritePlan[]>(() => data ?? [], [data]);

    const handleRemove = (id: string | undefined) => {
        deleteFavoritePlan(id!);
    };

    const handleRemoveAll = () => {
        deleteAllFavoritePlans();
    };

    return (
        <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
            <DrawerContent className="w-full sm:w-100 md:w-120">
                <DrawerHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                            <DrawerTitle>Meus Favoritos</DrawerTitle>
                        </div>
                        <DrawerClose render={<Button variant="ghost" size="icon"><X className="h-4 w-4" /></Button>} />
                    </div>
                    <DrawerDescription>
                        {favoritesData.length} plano{favoritesData.length !== 1 ? 's' : ''} favoritado{favoritesData.length !== 1 ? 's' : ''}
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                    {favoritesData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                            <Heart className="h-10 w-10 mb-2 opacity-50" />
                            <p>Nenhum favorito encontrado.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {favoritesData.map((fav) => (
                                <div
                                    key={fav.id}
                                    onClick={() => router.push(`/plans/${fav.id}`)}
                                    className="flex flex-col gap-4 p-4 border border-border rounded-lg hover:border-primary transition-shadow cursor-pointer"
                                >
                                    <div className="relative w-full h-42 overflow-hidden">
                                        <Image
                                            src={fav.thumbnail ?? "/default-thumbnail.jpg"}
                                            alt={`Thumbnail do plano ${fav.topic}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, 400px"
                                            loading="eager"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col gap-1 min-w-0">
                                            <p className="font-bold text-sm sm:text-base line-clamp-1">{fav.topic}</p>
                                            <div className="flex items-center text-xs sm:text-sm gap-2">
                                                <Globe className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">{fav.userName}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DeleteFavoritePlanDialog
                                            planId={fav.id}
                                            planTitle={fav.topic}
                                            isDeleting={isDeletingFavoritePlan}
                                            onDelete={handleRemove}
                                             />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {favoritesData.length > 0 && (
                    <DrawerFooter>
                        <DeleteFavoritePlanDialog
                            planId={""}
                            planTitle=""
                            isDeleting={isDeletingAllFavoritePlans}
                            deleteAll={true}
                            onDelete={handleRemoveAll}
                        />
                    </DrawerFooter>
                )}
            </DrawerContent>
        </Drawer>
    );
};
