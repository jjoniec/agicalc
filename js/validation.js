var maxDigitsAfterDot = 2;

function validateDecimal(e, obj)
{
	var pos = getCaretPosition(obj);
	var val = obj.value;
	var dot_at = val.indexOf('.')
	var zero_at = val.indexOf('0')
	
	// this is to allow backspace
    if ([e.keyCode || e.which] == 8) 
	{
		if ((pos == 1) && (zero_at == 0) && (dot_at == 1))
		{
			// If we try to get rid of leading zero and it is followed by '.'
			// delete '.' as well
			obj.value = obj.value.substring(2);
			pos = 0;
			setCaretPosition(obj, pos);
			e.preventDefault ? e.preventDefault() : e.returnValue = false; 
			return false;
		}
		else
		{
			return true;
		}
	}

	// this is to allow tab
	if ([e.keyCode || e.which] == 9) 
	{
		return true;
	}
	
	// this is to allow right arrow
	if ([e.keyCode || e.which] == 39) 
	{
		return true;
	}
	
	// this is to allow left arrow
	if ([e.keyCode || e.which] == 37) 
	{
		return true;
	}

	// this is to allow single decimal point
    if ([e.keyCode || e.which] == 46) 
    {
		if(dot_at > -1)
		{
			e.preventDefault ? e.preventDefault() : e.returnValue = false; 
			return false;
		}		
		return true;
    }
	
	// zero handling
	if ([e.keyCode || e.which] == 48)
	{
		if (pos == 0)
		{
			if (dot_at == -1)
			{
				// if zero is added on the front, and there is no "." yet - add "." automatically
				obj.value = '0.' + obj.value;
				pos = 2;
				setCaretPosition(obj, pos);
			}
			e.preventDefault ? e.preventDefault() : e.returnValue = false; 
			return false;
		} 
		else
		{
			// don't allow more than one zero on the front of '.'
			if ((obj.value[pos] == '.') && (obj.value[pos-1] == '0'))
			{
				e.preventDefault ? e.preventDefault() : e.returnValue = false; 
				return false;
			}
		}
	}

	// Allow digits
    if ([e.keyCode||e.which] < 48 || [e.keyCode||e.which] > 57) 
	{
		e.preventDefault? e.preventDefault() : e.returnValue = false; 
	}
	else
	{
		if ((dot_at > -1) && (pos > dot_at))
		{
			var digit_after_dot = val.length - dot_at;
			if (digit_after_dot > maxDigitsAfterDot)
			{
				// Don't allow more digit after "."
				e.preventDefault? e.preventDefault() : e.returnValue = false;
			}
		}
	}
}

function validateValue(event, obj)
{
	var pos = getCaretPosition(obj);
	var val = obj.value;
	var dot_at = val.indexOf('.')
	var zero_at = val.indexOf('0')
	
	if (dot_at == 0)
	{
		// Add leading '0' if '.' is first character
		obj.value = '0' + obj.value;
		pos = 2;
		dot_at++;
		setCaretPosition(obj, pos);
		
	}
	else if (dot_at == -1)
	{
		// Remove leading '0's if there is no '.'
		while (obj.value.indexOf("0") == 0)
		{
			obj.value = obj.value.substring(1);
			pos = 0;
			setCaretPosition(obj, pos);
		}
	}
	
	// Make sure that we still have max allowed number digits after dot.
	if (dot_at > -1) 
	{
		var digit_after_dot = val.length - dot_at;
		if (digit_after_dot > maxDigitsAfterDot)
		{
			obj.value = obj.value.substring(0, dot_at+maxDigitsAfterDot+1);
			setCaretPosition(obj, pos);
		}
	}
}

function validateData(event, obj)
{
	var numeric = Number(obj.value);
	if (numeric != 0)
	{
		obj.value = numeric.toFixed(maxDigitsAfterDot);
	}
	else
	{
		obj.value = numeric;
	}
}

function setCaretPosition(ctrl, pos)
{
	if(ctrl.setSelectionRange)
	{
		ctrl.focus();
		ctrl.setSelectionRange(pos,pos);
	}
	else if (ctrl.createTextRange) 
	{
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

function getCaretPosition (ctrl) 
{
	var CaretPos = 0;
	// IE Support
	if (document.selection) 
	{	 
		ctrl.focus ();
		var Sel = document.selection.createRange ();
		 
		Sel.moveStart ('character', -ctrl.value.length);
		 
		CaretPos = Sel.text.length;
	}
	// Firefox support
	else if (ctrl.selectionStart || ctrl.selectionStart == '0') 
	{
		CaretPos = ctrl.selectionStart;
	}
	return (CaretPos);
 
}
