import { AbstractControl } from '@angular/forms';
import { emailValidator } from './email.validator';

describe('emailValidator', () => {
  
  let control: AbstractControl;

  it('should return null for valid email', () => {
    control = { value: 'test@example.com' } as AbstractControl;
    
    const result = emailValidator()(control);
    
    expect(result).toBeNull();
  });

  it('should return an error for invalid email without "@"', () => {
    control = { value: 'testexample.com' } as AbstractControl;
    
    const result = emailValidator()(control);
    
    expect(result).toEqual({ invalidEmail: { value: 'testexample.com' } });
  });

  it('should return an error for invalid email with wrong domain', () => {
    control = { value: 'test@example' } as AbstractControl;
    
    const result = emailValidator()(control);
    
    expect(result).toEqual({ invalidEmail: { value: 'test@example' } });
  });

  it('should return an error for invalid email with spaces', () => {
    control = { value: 'test @example.com' } as AbstractControl;
    
    const result = emailValidator()(control);
    
    expect(result).toEqual({ invalidEmail: { value: 'test @example.com' } });
  });

  it('should return null for email with subdomain', () => {
    control = { value: 'test@mail.example.com' } as AbstractControl;
    
    const result = emailValidator()(control);
    
    expect(result).toBeNull();
  });

  it('should return null for email with plus sign', () => {
    control = { value: 'test+123@example.com' } as AbstractControl;
    
    const result = emailValidator()(control);
    
    expect(result).toBeNull();
  });
});
