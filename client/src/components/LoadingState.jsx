export default function LoadingState({ label = 'Warming the moka pot...' }) {
  return (
    <div className="glass-card flex min-h-64 items-center justify-center rounded-3xl p-8 text-center">
      <div>
        <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-crema/20 border-t-latte" />
        <p className="text-crema/75">{label}</p>
      </div>
    </div>
  );
}
