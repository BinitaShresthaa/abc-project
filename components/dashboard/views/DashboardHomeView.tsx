import NavIcon from "@/components/dashboard/icons";

export default function DashboardHomeView() {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <NavIcon name="grid" className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-base font-bold text-slate-800 dark:text-white">Welcome back</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Select a feature from the sidebar to get started.
        </p>
      </div>
    </div>
  );
}