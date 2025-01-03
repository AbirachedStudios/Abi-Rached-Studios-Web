interface LoginAttempt {
  attempts: number;
  lastAttempt: number;
  blocked: boolean;
}

class LoginAttemptsService {
  private attempts: Map<string, LoginAttempt>;
  private readonly MAX_ATTEMPTS = 5;
  private readonly BLOCK_DURATION = 15 * 60 * 1000; // 15 minutos en milisegundos

  constructor() {
    this.attempts = new Map();
  }

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

  public addAttempt(email: string): void {
    const attempt = this.attempts.get(email) || { attempts: 0, lastAttempt: Date.now(), blocked: false };
    attempt.attempts++;
    attempt.lastAttempt = Date.now();

    if (attempt.attempts >= this.MAX_ATTEMPTS) {
      attempt.blocked = true;
    }

    this.attempts.set(email, attempt);
  }

  public resetAttempts(email: string): void {
    this.attempts.delete(email);
  }

  public getRemainingTime(email: string): number {
    const attempt = this.attempts.get(email);
    if (!attempt || !attempt.blocked) return 0;

    const timeElapsed = Date.now() - attempt.lastAttempt;
    return Math.max(0, this.BLOCK_DURATION - timeElapsed);
  }
}

export const loginAttempts = new LoginAttemptsService(); 