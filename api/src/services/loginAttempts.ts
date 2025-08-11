interface LoginAttempt {
  attempts: number;
  lastAttempt: number;
  blocked: boolean;
}

/**
 * Servicio para gestionar los intentos de inicio de sesión y bloqueos temporales
 */
class LoginAttemptsService {
  private attempts: Map<string, LoginAttempt>;
  private readonly MAX_ATTEMPTS = 5;
  private readonly BLOCK_DURATION = 15 * 60 * 1000; // 15 minutos en milisegundos

  constructor() {
    this.attempts = new Map();
  }

  /**
   * Verifica si un email puede realizar intentos de inicio de sesión
   * @param email - Correo electrónico a verificar
   * @returns true si puede intentar iniciar sesión, false si está bloqueado
   */
  public checkAttempts(email: string): boolean {
    const attempt = this.attempts.get(email);
    
    if (!attempt) return true;

    // Si está bloqueado, verificar si ya pasó el tiempo de bloqueo
    if (attempt.blocked) {
      const timeElapsed = Date.now() - attempt.lastAttempt;
      if (timeElapsed >= this.BLOCK_DURATION) {
        this.resetAttempts(email);
        return true;
      }
      return false;
    }

    return true;
  }

  /**
   * Registra un nuevo intento de inicio de sesión fallido
   * @param email - Correo electrónico que realizó el intento
   */
  public addAttempt(email: string): void {
    const attempt = this.attempts.get(email) || { attempts: 0, lastAttempt: Date.now(), blocked: false };
    attempt.attempts++;
    attempt.lastAttempt = Date.now();

    if (attempt.attempts >= this.MAX_ATTEMPTS) {
      attempt.blocked = true;
    }

    this.attempts.set(email, attempt);
  }

  /**
   * Reinicia el contador de intentos para un email específico
   * @param email - Correo electrónico a reiniciar
   */
  public resetAttempts(email: string): void {
    this.attempts.delete(email);
  }

  /**
   * Calcula el tiempo restante de bloqueo para un email
   * @param email - Correo electrónico a consultar
   * @returns Tiempo restante en milisegundos, 0 si no está bloqueado
   */
  public getRemainingTime(email: string): number {
    const attempt = this.attempts.get(email);
    if (!attempt || !attempt.blocked) return 0;

    const timeElapsed = Date.now() - attempt.lastAttempt;
    return Math.max(0, this.BLOCK_DURATION - timeElapsed);
  }
}

export const loginAttempts = new LoginAttemptsService(); 