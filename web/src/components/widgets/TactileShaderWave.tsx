import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import {
  createShader,
  playSweep,
  resolvePalette,
  type PaletteName,
  type Direction,
  type ShaderController
} from 'glimm';

export interface TactileTriggerOptions {
  palette?: PaletteName;
  direction?: Direction;
  sweepMs?: number;
  onMidpoint?: () => void;
  onComplete?: () => void;
}

export interface TactileShaderWaveHandle {
  trigger: (options?: TactileTriggerOptions) => void;
}

export const TactileShaderWave = forwardRef<TactileShaderWaveHandle, { defaultPalette?: PaletteName }>(
  ({ defaultPalette = 'prism' }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctrlRef = useRef<ShaderController | null>(null);
    const activeAnimationRef = useRef<{ cancel: () => void } | null>(null);

    useEffect(() => {
      if (canvasRef.current && !ctrlRef.current) {
        try {
          const ctrl = createShader({
            canvas: canvasRef.current,
            palette: resolvePalette(defaultPalette),
            bandTight: 6,
            direction: 'ltr'
          });
          if (ctrl) {
            ctrlRef.current = ctrl;
          }
        } catch (e) {
          console.warn('[TactileShaderWave] Shader init failed:', e);
        }
      }

      return () => {
        activeAnimationRef.current?.cancel();
        ctrlRef.current?.destroy();
        ctrlRef.current = null;
      };
    }, [defaultPalette]);

    useImperativeHandle(ref, () => ({
      trigger: (options: TactileTriggerOptions = {}) => {
        const palette = options.palette ?? defaultPalette;
        const direction = options.direction ?? 'ltr';
        const sweepMs = options.sweepMs ?? 1050;

        activeAnimationRef.current?.cancel();

        if (ctrlRef.current) {
          const ctrl = ctrlRef.current;
          ctrl.setDirection(direction);
          ctrl.setBandTight(6);
          ctrl.setWaveAmount(1.4);
          ctrl.setRippleAmount(1.2);
          ctrl.setWaveSpeed(1.4);
          ctrl.setBrightness(1.35);
          ctrl.setSwellAmount(1.0);

          const anim = playSweep(ctrl, {
            sweepMs,
            outroMs: 260,
            midpoint: 0.48,
            palette: resolvePalette(palette),
            direction,
            easing: 'easeInOutCubic',
            peakAlpha: 1.2,
            onMidpoint: options.onMidpoint,
            onComplete: () => {
              activeAnimationRef.current = null;
              options.onComplete?.();
            }
          });
          activeAnimationRef.current = anim;
        } else {
          options.onMidpoint?.();
          options.onComplete?.();
        }
      }
    }));

    return (
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden z-[99999]"
        style={{ width: '100vw', height: '100vh' }}
        aria-hidden="true"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{ pointerEvents: 'none' }}
        />
      </div>
    );
  }
);

TactileShaderWave.displayName = 'TactileShaderWave';
