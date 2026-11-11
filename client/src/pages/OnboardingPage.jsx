import { UserButton, useOrganizationList } from "@clerk/react";
import { AlertCircle, Layers, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const [activationError, setActivationError] = useState(null);
  const [isActivating, setIsActivating] = useState(false);

  const attemptedOrgId = useRef(null);

  const memberships = userMemberships?.data ?? [];
  const primaryMembership = memberships[0];
  const orgId = primaryMembership?.organization?.id;
  const orgName = primaryMembership?.organization?.name;

  const activateWorkspace = useCallback(async () => {
    if (!orgId) return;

    try {
      setIsActivating(true);
      setActivationError(null);

      await setActive({ organization: orgId });

      navigate(`/w/${orgId}`, { replace: true });
    } catch (err) {
      console.error("Workspace activation error!", err);
      attemptedOrgId.current = null;
      setActivationError(
        "Unable to activate your workspace. Please try again.",
      );
    } finally {
      setIsActivating(false);
    }
  }, [orgId, setActive, navigate]);

  useEffect(() => {
    if (!isLoaded || userMemberships.isLoading) return;
    if (userMemberships.error || !orgId) return;
    if (attemptedOrgId.current === orgId) return;

    attemptedOrgId.current = orgId;
    activateWorkspace();
  }, [
    isLoaded,
    userMemberships.isLoading,
    userMemberships.error,
    orgId,
    activateWorkspace,
  ]);

  const isLoadingMemberships = !isLoaded || userMemberships.isLoading;

  if (!isLoadingMemberships && !userMemberships.error && memberships.length === 0) {
    return <Navigate to="/create-workspace" replace />;
  }

  const hasMembershipError = !isLoadingMemberships && Boolean(userMemberships.error);
  const hasError = hasMembershipError || Boolean(activationError);

  const handleRetry = () => {
    if (hasMembershipError) {
      userMemberships.revalidate?.();
      return;
    }

    attemptedOrgId.current = orgId;
    activateWorkspace();
  };

  return (
    <div className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-white px-4 py-20">
      <div className="pointer-events-none absolute -top-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-1/3 h-72 w-72 rounded-full bg-[#8A7DFF]/15 blur-3xl" />

      <header className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-5 md:px-12">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-gray-900 transition hover:opacity-85"
        >
          <span className="btn flex size-8 items-center justify-center rounded-lg text-white shadow-sm shadow-indigo-600/20">
            <Layers className="size-4" aria-hidden="true" />
          </span>
          <span>Doing</span>
        </Link>
        <UserButton />
      </header>

      {hasError ? (
        <main
          role="alert"
          className="relative flex w-full max-w-sm flex-col items-center rounded-2xl border border-indigo-100/80 bg-white/85 px-8 py-10 text-center shadow-xl shadow-indigo-600/5 backdrop-blur-md"
        >
          <div className="flex size-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-100">
            <AlertCircle className="size-7" aria-hidden="true" />
          </div>

          <span className="mt-5 inline-flex items-center rounded-full border border-rose-100 bg-rose-50/70 px-3 py-1 text-xs font-medium text-rose-600">
            Something went wrong
          </span>

          <h1 className="mt-4 text-lg font-semibold tracking-tight text-gray-900">
            {hasMembershipError
              ? "Couldn't load workspaces"
              : "Workspace activation failed"}
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
            {hasMembershipError
              ? "Unable to retrieve your workspace memberships. Please check your connection and try again."
              : activationError}
          </p>

          <button
            type="button"
            onClick={handleRetry}
            disabled={isActivating}
            className="btn mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/20 transition hover:opacity-95 active:scale-[0.99] disabled:opacity-60"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            <span>Try again</span>
          </button>

          <Link
            to="/"
            className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600"
          >
            Back to home
          </Link>
        </main>
      ) : (
        <main
          role="status"
          aria-live="polite"
          className="relative flex w-full max-w-sm flex-col items-center rounded-2xl border border-indigo-100/80 bg-white/85 px-8 py-10 text-center shadow-xl shadow-indigo-600/5 backdrop-blur-md"
        >
          <div className="relative flex size-16 items-center justify-center">
            <div className="absolute -inset-2 animate-pulse rounded-full bg-indigo-400/15 blur-md" />
            <div className="absolute inset-0 rounded-full border-[3px] border-indigo-100" />
            <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-indigo-600 border-r-[#8A7DFF]" />
            <div className="relative flex size-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <Layers className="size-5" aria-hidden="true" />
            </div>
          </div>

          <span className="mt-5 inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50/70 px-3 py-1 text-xs font-medium text-indigo-600">
            {isLoadingMemberships ? "Step 1 of 2" : "Step 2 of 2"}
          </span>

          <h1 className="mt-4 text-lg font-semibold tracking-tight text-gray-900">
            {isLoadingMemberships
              ? "Preparing your workspace"
              : isActivating
                ? "Activating your workspace"
                : "Opening your workspace"}
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
            {isLoadingMemberships
              ? "Checking your memberships and setting things up..."
              : orgName
                ? `Signing you into ${orgName}...`
                : "Please wait while we set things up."}
          </p>

          <div className="mt-6 flex items-center gap-1.5" aria-hidden="true">
            <span className="size-1.5 animate-bounce rounded-full bg-indigo-600 [animation-delay:-0.3s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.15s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-[#8A7DFF]" />
          </div>
        </main>
      )}
    </div>
  );
};

export default OnboardingPage;