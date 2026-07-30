import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Globe, Lock } from "lucide-react"

interface ChangeVisibilityToogleProps {
  visibility: 'PUBLIC' | 'PRIVATE';
  onChangeVisibility: (visibility: 'PUBLIC' | 'PRIVATE') => void;
}

export function ChangeVisibilityToogle({ visibility, onChangeVisibility }: ChangeVisibilityToogleProps) {
  return (
    <ToggleGroup variant="outline" value={[visibility === 'PUBLIC' ? 'publico' : 'privado']} className="flex gap-2 border rounded-lg p-1">
      <ToggleGroupItem
      value="publico" 
      aria-label="Toggle público"
      disabled={visibility === 'PUBLIC'}
      onClick={(e) => {
          onChangeVisibility('PUBLIC');
          e.stopPropagation();
      }}
      >
        <div className="flex items-center gap-2 cursor-pointer" >
            <Globe className="mr-2 h-4 w-4" />
            <span> Público </span>
        </div>
      </ToggleGroupItem>
      <ToggleGroupItem 
      value="privado" 
      aria-label="Toggle privado" 
      disabled={visibility === 'PRIVATE'}
      onClick={(e) => {
        onChangeVisibility('PRIVATE');
        e.stopPropagation();
      }}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <Lock className="mr-2 h-4 w-4" />
          <span> Privado </span>
        </div>
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
