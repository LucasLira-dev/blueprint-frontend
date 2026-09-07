import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Globe, Lock, Loader2 } from "lucide-react"

interface ChangeVisibilityToogleProps {
  visibility: 'PUBLIC' | 'PRIVATE';
  onChangeVisibility: (visibility: 'PUBLIC' | 'PRIVATE') => void;
  isPending?: boolean;
}

export function ChangeVisibilityToogle({ visibility, onChangeVisibility, isPending }: ChangeVisibilityToogleProps) {
  const isPublic = visibility === 'PUBLIC'

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={(e) => {
          onChangeVisibility(isPublic ? 'PRIVATE' : 'PUBLIC');
          e.stopPropagation();
        }}
        disabled={isPending}
        className="inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3 text-sm font-medium transition-colors gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isPublic ? (
          <Globe className="h-4 w-4" />
        ) : (
          <Lock className="h-4 w-4" />
        )}
        <span>{isPending ? 'Alterando...' : isPublic ? 'Público' : 'Privado'}</span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isPublic ? 'Qualquer pessoa pode ver' : 'Apenas você pode ver'}</p>
      </TooltipContent>
    </Tooltip>
  )
}
