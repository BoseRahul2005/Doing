import { useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";
import { Layers } from "lucide-react";

const RequireAuth = ({children}) => {
    const {isLoaded, isSignedIn}= useAuth();

    if(!isLoaded){
        return (
            <div
          role="status"
          aria-live="polite"
          className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-white px-4"
        >
          <div className="pointer-events-none absolute -top-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-100/70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 right-1/3 h-72 w-72 rounded-full bg-[#8A7DFF]/15 blur-3xl" />

          <div className="relative flex w-full max-w-sm flex-col items-center rounded-2xl border border-indigo-100/80 bg-white/80 px-8 py-10 text-center shadow-xl shadow-indigo-600/5 backdrop-blur-md">
            <div className="relative flex size-16 items-center justify-center">
              <div className="absolute -inset-2 animate-pulse rounded-full bg-indigo-400/15 blur-md" />
              <div className="absolute inset-0 rounded-full border-[3px] border-indigo-100" />
              <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-indigo-600 border-r-[#8A7DFF]" />
              <div className="relative flex size-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <Layers className="size-5" aria-hidden="true" />
              </div>
            </div>

            <h2 className="mt-6 text-lg font-semibold tracking-tight text-gray-900">
              Preparing your workspace
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
              Checking your memberships and setting things up...
            </p>

            <div className="mt-6 flex items-center gap-1.5" aria-hidden="true">
              <span className="size-1.5 animate-bounce rounded-full bg-indigo-600 [animation-delay:-0.3s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.15s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-[#8A7DFF]" />
            </div>
          </div>
        </div>
        );
    }

    if(!isSignedIn){
        return <Navigate to="/" replace />;
    }

    return children;
}

export default RequireAuth