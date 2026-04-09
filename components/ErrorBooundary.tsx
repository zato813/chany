"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface Props { children: ReactNode; fallback?: ReactNode }
interface State { hasError: boolean; error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex flex-col items-center text-center text-rose-950">
          <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
          <h2 className="font-bold mb-1">Algo salió mal</h2>
          <p className="text-sm font-light opacity-70">No pudimos cargar esta sección. Refresca la página.</p>
        </div>
      );
    }
    return this.props.children;
  }
}