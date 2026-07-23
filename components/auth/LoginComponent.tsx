'use client';

import { useState } from "react";
import { LoginForm } from "./LoginForm"
import { SocialLogin } from "./SocialLogin"

export const LoginComponent = () => {

    const [isAnyLoading, setIsAnyLoading] = useState(false);
    const [sharedError, setSharedError] = useState("");

    return (
        <div className="glass-panel rounded-2xl p-8">
            {sharedError && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {sharedError}
                </div>
            )}

            <SocialLogin
                disabled={isAnyLoading}
                onLoadingChange={setIsAnyLoading}
                onError={setSharedError}
            />

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-surface text-muted-foreground">ou</span>
                </div>
            </div>

            <LoginForm
                disabled={isAnyLoading}
                onLoadingChange={setIsAnyLoading}
                onError={setSharedError}
            />
        </div>
    )
}