import { CreateOrganization, UserButton } from "@clerk/react";
import { useState } from "react";
import {
  ArrowRight,
  FolderKanban,
  FolderPlus,
  Layers,
  Plus,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const CreateWorkspace = () => {
  const [showCreateOrg, setShowCreateOrg] = useState(false);

  const highlights = [
    {
      icon: FolderKanban,
      text: "Organize projects and tasks in one shared space",
    },
    {
      icon: Users,
      text: "Invite teammates and collaborate with clear roles",
    },
    {
      icon: Layers,
      text: "Switch seamlessly between multiple workspaces",
    },
  ];

  return (
    <div className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-white px-4 py-20"
    onClick={(e) => {
            if (e.target === e.currentTarget) setShowCreateOrg(false);
          }}
    >
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

      {showCreateOrg ? (
        <div className="p-6 relative">
          <button
            type="button"
            onClick={() => setShowCreateOrg(false)}
            className="absolute top-10 right-8 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition cursor-pointer z-20"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="pt-2">
            <CreateOrganization
              routing="hash"
              afterCreateOrganizationUrl='/onboard'
            />
          </div>
        </div>
      ) : (
        <main className="relative w-full max-w-md rounded-2xl border border-indigo-100/80 bg-white/85 p-8 text-center shadow-xl shadow-indigo-600/5 backdrop-blur-md sm:p-10">
          <div className="relative mx-auto flex size-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
            <FolderPlus className="size-7" aria-hidden="true" />
            <span className="btn absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full text-white shadow-sm">
              <Sparkles className="size-3.5" aria-hidden="true" />
            </span>
          </div>

          <span className="mt-5 inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50/70 px-3 py-1 text-xs font-medium text-indigo-600">
            Workspace setup
          </span>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
            No workspace yet
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Create your first workspace to organize projects, track tasks, and
            collaborate with your team.
          </p>

          <ul className="mt-6 space-y-2.5 rounded-xl border border-slate-100 bg-slate-50/70 p-4 text-left">
            {highlights.map((item) => (
              <li key={item.text} className="flex items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-indigo-100/80 bg-white text-indigo-600 shadow-2xs">
                  <item.icon className="size-3.5" aria-hidden="true" />
                </span>
                <span className="text-xs font-medium text-slate-600">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setShowCreateOrg(true)}
            className="btn mt-7 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-600/20 transition hover:opacity-95 active:scale-[0.99]"
          >
            <Plus className="size-4" aria-hidden="true" />
            <span>Create now!</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>

          <p className="mt-4 text-xs text-slate-400">
            Waiting on an invite? Check your email or ask a teammate to add you.
          </p>
        </main>
      )}
    </div>
  );
};

export default CreateWorkspace;
